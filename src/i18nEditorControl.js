import PropTypes from 'prop-types';
import React from 'react';
import { HotTable, HotColumn } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import './i18nEditorControl.css';

import { Map } from 'immutable';

 export default class i18nEditorControl extends React.Component {
  constructor(props) {
    super(props);
    this.hotSettings = {
      data: Handsontable.helper.createSpreadsheetData(5, 5),
      colHeaders: true,
      colWidths: [300, 300],
      contextMenu: {
        items: {
          'row_above': {
            name: 'Insert row above this one (custom name)'
          },
          'row_below': {},
          'remove_row': {},
        }
      },
    };
    this.state = {isInError: false};
    this.errorDesc = [];
    this.rowsKeys = {};
    this.lastChanges = [];
    this.stateValue;
    const getErrorRowOrCreate = (errorsArray, index)=> {
      let found = getErrorRow(errorsArray, index);
      if (!found) {
        found = {index, key: this.stateValue[index].key, errors: []};
        errorsArray.push(found);
      }
      return found;
    }
    const getErrorRow = (errorsArray, index)=> {
      return errorsArray.find((el)=> el.index === index);
    }
    const initializeRowsKeys = ()=> {
      this.stateValue.forEach((row, index)=> this.rowsKeys[row.key] = [index])
    }
    this.isValid = ()=>{
      return this.errorDesc.length ? { error: 'Your error message.' } : true;
    };
    this.checkLastChangeIsValid = () => {
      const {index,colName,oldValue,newValue} = this.lastChanges;
      if (index) {
        const foundErrors = [];
        if (colName === 'value' && !newValue) {
          foundErrors.push('VALUE_NOT_NULL');
        }
        debugger;
        if (colName === 'key') {
          if (!newValue) {
            foundErrors.push('KEY_NOT_NULL');
          } else {
            if (!this.rowsKeys.length) initializeRowsKeys();
            const existingKey = this.rowsKeys[newValue];
            //hasDuplicate tiene que devolver el index del duplicate
            if(existingKey) {
              if (existingKey.length === 1) {
                const existingKeyIndex = existingKey[0];
                const found = this.errorDesc.find((el)=> el.index === existingKeyIndex);
                if (!found) {
                  found = {duplicateIndex, key: existingKeyIndex, errors: []};
                  errorsArray.push(found);
                }
                found.push('KEY_NOT_NULL');
              }

              foundErrors.push('KEY_DUPLICATED');
              existingKey.push(index)
              // Añadir tb el error duplicado a la key que ya existe si es el primer dupe

            } else if(oldValue && this.rowsKeys[oldValue]) {
              this.rowsKeys[oldValue] = this.rowsKeys[oldValue] - 1;
              if (this.rowsKeys[oldValue] === 1) {
                for (let i = 0; i < this.errorDesc.length; i++) {
                  const errorRow = this.errorDesc[i];
                  if (errorRow.key === oldValue) {
                    errorRow.errors = errorRow.errors.filter((error)=> !error.includes('KEY_DUPLICATED'))
                    break;
                  }
                }
              }
            }

          }
        }
        if (foundErrors.length){
          const errorRow = getErrorRowOrCreate(this.errorDesc, index);
          errorRow.errors = foundErrors;
          this.setState({isInError: true});
          return false;
        } else {
          this.errorDesc = this.errorDesc.filter((el)=> el.index !== index && el.errors.length > 0)
          console.log('length', this.errorDesc, this.errorDesc.length)
          if (this.errorDesc.length > 0) {
            this.setState({isInError: true});
            return false;
          } else {
            this.setState({isInError: false});
            return true;
          }
          // this.setState({isInError: false});
        }
      }
    }
  }

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
    // const fieldName2 = field.get('name');
    // const fieldValue = value && Map.isMap(value) ? value.get(fieldName) : value;
    if (typeof value === 'string') {
      const tempObj = JSON.parse(value || '{}');
      this.stateValue = Object.entries(tempObj).map(([key, value]) => ({key: key || '', value}));
    }
    if (typeof value === 'object' && value !== null) {
      // When coming from file git read, the value Object has some entries that we dont want to map
      if(value._root) {
        this.stateValue = value._root.entries.map(([key, value]) => ({key: key || '', value}));
      // When coming from updates in the table component, we map all the entries
      } else {
        this.stateValue = Object.entries(value).map(([key, value]) => ({key: key || '', value}));
      }
    }
    // When is not valid, it can be for duplicate keys, the value remains as an array of objects
    // If we convert to an object, the we lose the duplicate keys, but we want the user to be able
    // to edit it
    if (Array.isArray(value)) {
      this.stateValue = value;
    }
    const handleChange = (data) => {
      debugger;
      if(data && data[0]) {
        let index,colName,oldValue,newValue;
        [index,colName,oldValue,newValue] = data[0];
        this.lastChanges = {index,colName,oldValue,newValue,row: this.stateValue[index]};
        console.log('saved lastchanges',this.lastChanges)
        // this.stateValue[index][colName] = newValue;
        onChange(this.stateValue)
        if (this.checkLastChangeIsValid()) {
          let finalObjectValue = {};
          for (var i=0; i < this.stateValue.length; i++) {
            finalObjectValue[this.stateValue[i].key || ''] = this.stateValue[i].value;
          }
          onChange(finalObjectValue)
        } 
      }
    }
    const handleRemoveRow = (index,amount,rows) => {
      // remove the possible errors from that index
      this.errorDesc = this.errorDesc.filter((el)=> el.index !== index && el.errors.length > 0)
      setTimeout(()=> this.forceUpdate(), 500);
      // TODO update indexes of errors and keyMap
      // this.setState({isInError: true});
    }
    const {isInError} = this.state;
    const errorDesc = this.errorDesc;
    return (
      <section>
      {isInError &&
      <div class="error-list">
        <span>You have this errors in the file 🤕:</span>
        {errorDesc.map(errorRow => errorRow.errors.map(error => <tr key={error}>{error}</tr>))}
      </div>
      }
      <span>{typeof this.stateValue}</span>
      <span>{this.stateValue.length}</span>
      <div id="hot-app">
        <HotTable
          settings={this.hotSettings}
          data={this.stateValue} 
          colHeaders={true} 
          rowHeaders={true} 
          licenseKey="non-commercial-and-evaluation" 
          afterChange={handleChange}
          afterRemoveRow={handleRemoveRow}

        >
        <HotColumn title="Key" data="key"/>
        <HotColumn title="Value" data="value"/>
        </HotTable>
      </div>
      </section>
    );
   }
  }
