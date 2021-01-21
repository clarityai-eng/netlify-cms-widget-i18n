import PropTypes from 'prop-types';
import React from 'react';
import { HotTable, HotColumn } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import './i18nEditorControl.css';
import { List } from 'immutable';

import { Map } from 'immutable';

 export default class i18nEditorControl extends React.Component {

  constructor(props) {
    super(props);
    this.hotSettings = {
      data: Handsontable.helper.createSpreadsheetData(5, 5),
      colHeaders: true,
      colWidths: [300, 400],
      comments: true,
      // viewportRowRenderingOffset: 70,
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
    this.hotTableComponent = React.createRef();
    this.stateValue = [];
    this.stateKeysCount = {};
    this.stateValidations = [];
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

   isValid = ()=> {
     return this.checkNoErrors();
   }
   convertToFlatArray = (mainObj)=> {
    let flattenedArray = [];
    const flatten = (keyToFlatten, path)=> {
      for (const key in keyToFlatten) {
        const cumulatePath = `${path ? path + '.' : ''}${key}`;
        if (typeof keyToFlatten[key] === 'object') {
          flatten(keyToFlatten[key], cumulatePath)
        } else {
          flattenedArray.push({ key: cumulatePath, value: keyToFlatten[key]})
          this.stateKeysCount[cumulatePath] = 1;
        }
      }
    }
    flatten(mainObj)
      return flattenedArray;
    }
    checkDuplicates = (key)=> {
      return !!this.stateKeysCount[key];
    }
    addKeyCount = (key) => {
      this.stateKeysCount[key] = this.stateKeysCount[key] ? this.stateKeysCount[key] + 1 : 1;
    }
    setKeyCount = (key, count)=> {
      this.stateKeysCount[key] = count;
    }
    checkNoErrors = () => {
      return !Object.values(this.stateKeysCount).some((el)=> el > 1)
    }
    removeKeyCount = (key)=> {
      if (this.stateKeysCount[key] === 1) {
        delete this.stateKeysCount[key];
      } else if (this.stateKeysCount[key] > 1) {
        this.stateKeysCount[key] = this.stateKeysCount[key] - 1;
      } else {
        console.warn('Trying to remove no existing key: ', key);
      }
    }

   componentDidMount() {
    const updateDataInNetlify = () => {
      //if no errors then call to update to be able to publish changes
      
      if (this.checkNoErrors()) {
        console.log('No errors, calling netlify')
        let finalObjectValue = {};
        for (var i=0; i < this.stateValue.length; i++) {
          finalObjectValue[this.stateValue[i].key || ''] = this.stateValue[i].value;
        }
        console.log('llamada a change', finalObjectValue)
        this.props.onChange(finalObjectValue)
      }
    }

    if(this.hotTableComponent.current) {
      this.hotTableComponent.current.hotInstance.addHook('afterChange', (changes, source)=> {
        // source -> ['edit', 'loadData']
        let index,colName,oldValue,newValue;
        changes && ([index,colName,oldValue,newValue] = changes[0]);
        if (changes && source === 'edit' && colName === 'key' && oldValue !== newValue) {
          //after every change, run validation on the "0 column"
          const instance = this.hotTableComponent.current.hotInstance;
          const keyIndexes = [];
          let keyColumnRowsArray = instance.getDataAtCol(0);
          keyColumnRowsArray.forEach((key, index)=> {
            if (key === newValue) {
              keyIndexes.push(index);
            }
          });
          console.log(keyIndexes);
          const keyAlreadyExists = keyIndexes.length > 1
          if (keyAlreadyExists) {
            keyIndexes.forEach((duplicatedKeyIndex)=> {
              let cell= instance.getCellMeta(duplicatedKeyIndex, 0);
              cell.valid = false;
              cell.comment = { value: 'No Duplicate Value allowed !!!'};
            })
          }
          this.setKeyCount(newValue, keyIndexes.length);
          this.removeKeyCount(oldValue);
          instance.render();
          updateDataInNetlify();
          // keyColumnRowsArray.forEach((value, row)=> {
          //   let data = Object.assign([], keyColumnRowsArray);
          //   let index = data.indexOf(value);
          //   data.splice(index, 1);
          //   let second_index = data.indexOf(value);
          //   let cell= instance.getCellMeta(row, 0);
          //   if (index > -1 && second_index > -1 && !(value == null || value === '')) {
          //       cell.valid = false
          //       cell.comment = { value: 'No Duplicate Value allowed !!!'}
          //       this.stateValidations.push({rowIndexes: [index, second_index], error: 'DUPLICATED'});
          //   } else {
          //       cell.valid = true
          //       cell.comment = ''
          //   }
          // });
          // //force a re-render so the new cell properties show up
          // updateDataInNetlify();
          // instance.render()
        }
        
      });
    }
  }

  render() {
    const {
      forID,
      value,
      onChange,
      classNameWrapper,
      field,
      forList,
      hasError,
    } = this.props;

    console.log(
      {
        forID,
        value,
        onChange,
        classNameWrapper,
        field,
        forList,
        hasError,
      }
    )
    console.log('props',this.props)
    console.log('entry',this.props.entry.get('path'));
    // console.log('raw',this.props.entry.get('raw'));

    const fileFolder = this.props.collection.get('folder');
    const filePath = this.props.entry.get('path');
    const fileName = this.props.entry.get('slug');
    const status = this.props.entry.get('status');

    const isNewRecord = this.props.entry.get('newRecord');
    const collectionFieldsArray = JSON.parse(JSON.stringify(this.props.collection.get('fields')));
    const collectioni18EditorWidgetField = collectionFieldsArray.find((el)=> el.widget === 'i18nEditor');
    const JSONFilePropName = collectioni18EditorWidgetField.name;

    if (typeof value === 'object' && value !== null) {
      // if(value._root) {
      //   this.stateValue = Array.from(this.props.value.entries()).map(([key, value]) => ({key: key || '', value}));
      //   console.log('created initial object')
      // }
      if(value._root) {        
        debugger;
        const receivedObject = JSON.parse(this.props.entry.get('raw'));
        this.stateValue = this.convertToFlatArray(receivedObject[JSONFilePropName]);
      } else {
        // Initialize the table object to have at least 1 empty row
        if(!this.stateValue.length) {
          this.stateValue.push({key: '', value: ''})
        }
      }
    }

    debugger;
    return (
      <section>
        <div
        id={forID}
        className={classNameWrapper}
        >
        {
          <div class="header-info">
          {!filePath && <div><span>You are creating a new file inside: </span><span class="italic">/{fileFolder}</span></div>}
          {!!filePath && <div><span>You are editing: </span><span class="italic">/{filePath}</span></div>}
          {<div>The name of the main prop in the JSON file is: {JSONFilePropName}</div>}
        </div>
        }
        <div id="hot-app">
          <HotTable
            ref={this.hotTableComponent}
            settings={this.hotSettings}
            data={this.stateValue} 
            colHeaders={true} 
            rowHeaders={true} 
            licenseKey="non-commercial-and-evaluation" 
            >
          <HotColumn title="Key" data="key"/>
          <HotColumn title="Value" data="value"/>
          </HotTable>
        </div>
        {/* <button onClick={this.swapHotData.bind(this)}>Load new data!</button> */}

      </div>
      </section>
    );
   }
  }
