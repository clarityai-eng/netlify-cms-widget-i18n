import PropTypes from 'prop-types';
import React from 'react';
import { HotTable, HotColumn } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import { Map } from 'immutable';

 export default class i18nEditorControl extends React.Component {
  constructor(props) {
    super(props);
    this.hotSettings = {
      data: Handsontable.helper.createSpreadsheetData(5, 5),
      colHeaders: true,
      contextMenu: {
        items: {
          'row_above': {
            name: 'Insert row above this one (custom name)'
          },
          'row_below': {},
          'remove_row': {},
          // 'separator': Handsontable.plugins.ContextMenu.SEPARATOR,
          // 'clear_custom': {
          //   name: 'Clear all cells (custom)',
          //   callback: function() {
          //     this.clear();
          //   }
          // }
        }
      },
      // afterChange: (changes) => {
      //     console.log(changes)

      // }
    };
    this.state = {isInError: false};
    this.errorDesc = [];
    this.lastChanges = [];
    this.isValid = ()=>{
      // Do internal validation
      this.errorDesc = [];
      console.log('last changesssss:',this.lastChanges);
      const {index,colName,oldValue,newValue,row} = this.lastChanges;
      if (row) {
        if (!row.value) {
          this.errorDesc.push(`Value cannot be null in row ${index + 1}`);
        }
        if (!row.key) {
          this.errorDesc.push(`Key cannot be null in row ${index + 1}`);
        }
        if (this.errorDesc.length){
          this.setState({isInError: true});
        } else {
          this.setState({isInError: false});
        }
      }
      return this.errorDesc.length ? { error: 'Your error message.' } : true;
    };
  }

  // state = { rows };
   static propTypes = {
     onChange: PropTypes.func.isRequired,
     forID: PropTypes.string,
     value: PropTypes.node,
     classNameWrapper: PropTypes.string.isRequired,
   }

   static defaultProps = {
     value: '',
   }

  render() {
    const {
      forID,
      value,
      onChange,
      classNameWrapper,
      field
    } = this.props;
    //  const collectionProps = collection._root.entries;
    const fieldName = field._root.entries[0][1];
    let stateValue = {};


    // const fieldName2 = field.get('name');
    // const fieldValue = value && Map.isMap(value) ? value.get(fieldName) : value;
    if (typeof value === 'string') {
      const tempObj = JSON.parse(value || '{}');
      stateValue = Object.entries(tempObj).map(([key, value]) => ({key: key || '', value}));
    }
    if (typeof value === 'object' && value !== null) {
      // When coming from file git read, the value Object has some entries that we dont want to map
      if(value._root) {
        stateValue = value._root.entries.map(([key, value]) => ({key: key || '', value}));
      // When coming from updates in the table component, we map all the entries
      } else {
        stateValue = Object.entries(value).map(([key, value]) => ({key: key || '', value}));
      }
    }
    // When is not valid, it can be for duplicate keys, the value remains as an array of objects
    // If we convert to an object, the we lose the duplicate keys, but we want the user to be able
    // to edit it
    if (Array.isArray(value)) {
      stateValue = value;
    }
    
    const manageChange = (data) => {
      if(data && data[0]) {
        let index,colName,oldValue,newValue;
        [index,colName,oldValue,newValue] = data[0];
        this.lastChanges = {index,colName,oldValue,newValue,row: stateValue[index]};
        console.log('saved lastchanges',this.lastChanges)
        stateValue[index][colName] = newValue;
        if (this.isValid()) {
          let finalObjectValue = {};
          for (var i=0; i < stateValue.length; i++) {
            finalObjectValue[stateValue[i].key || ''] = stateValue[i].value;
          }
          onChange(finalObjectValue)
        } else {
          onChange(stateValue)
        }
      }
    }
    const manageRemoveRow = (index,amount,rows) => {
      console.log('removing', index, rows)
      // When removing isValid, so we transform into object and call onChange
      // TODO if is the last row then isValid = false?
      let finalObjectValue = {};
      for (var i=0; i < stateValue.length; i++) {
        finalObjectValue[stateValue[i].key || ''] = stateValue[i].value;
      }
      onChange(finalObjectValue)
    }
    const {isInError} = this.state;
    const errorDesc = this.errorDesc;
    return (
      <section>
      {isInError && errorDesc.map(error => <tr key={error}>{error}</tr>)}

      <div id="hot-app">
        <HotTable
          settings={this.hotSettings}
          data={stateValue} 
          colHeaders={true} 
          rowHeaders={true} 
          width="800" height="300" 
          licenseKey="non-commercial-and-evaluation" 
          afterChange={manageChange}
          afterRemoveRow={manageRemoveRow}
        >
        <HotColumn title="Key" data="key"/>
        <HotColumn title="Value" data="value"/>
        </HotTable>
      </div>
      </section>
    );
   }
  }
