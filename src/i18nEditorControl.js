import PropTypes from 'prop-types';
import React from 'react';
import { HotTable, HotColumn } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';

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

  isValid(){
    // Do internal validation
    return { error: 'Your error message.' };
  };
  render() {
    const {
      forID,
      value,
      onChange,
      classNameWrapper,
      field
    } = this.props;
    console.log(field.get('fields'),field.get('entries'));
    //  const collectionProps = collection._root.entries;
    const fieldName = field._root.entries[0][1];
    const stateValue = JSON.parse(value || '{}');
    console.log(fieldName, stateValue);
    
    
    const rows = Object.entries(stateValue).map(([key, value]) => ({key: key || '', value}));
    
    const manageChange = (data) => {
      if(data && data[0]) {
        let index,colName,oldValue,newValue;
        [index,colName,oldValue,newValue] = data[0];
        rows[index][colName] = newValue;
        const stateValueChanged = {};
        for (var i=0; i < rows.length; i++) {
          stateValueChanged[rows[i].key || ''] = rows[i].value;
        }
        onChange(JSON.stringify(stateValueChanged))
      }
    }

    return (
      <section>
      <div id="hot-app">
        <HotTable
          settings={this.hotSettings}
          data={rows} 
          colHeaders={true} 
          rowHeaders={true} 
          width="800" height="300" 
          licenseKey="non-commercial-and-evaluation" 
          afterChange={manageChange}
        >
        <HotColumn title="Key" data="key"/>
        <HotColumn title="Value" data="value"/>
        </HotTable>
      </div>
      </section>
    );
   }
  }
