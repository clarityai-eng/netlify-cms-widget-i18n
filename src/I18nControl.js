import PropTypes from 'prop-types';
import React from 'react';
import { HotTable, HotColumn } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import './I18nControl.css';
import { List } from 'immutable';

import { Map } from 'immutable';

 export default class I18nControl extends React.Component {

  constructor(props) {
    super(props);

    this.stateValue = [];
    this.stateKeysCount = {};
    this.stateValidations = [];
    this.keySearchText = '';
    this.valueSearchText = '';
    this.valueEditRowIndex = null;

      // Event for `keydown` event. Add condition after delay of 200 ms which is counted from time of last pressed key.
  var debounceFn = Handsontable.helper.debounce( (colIndex, event)=> {
    var filtersPlugin = this.hotTableComponent.current.hotInstance.getPlugin('filters');
    filtersPlugin.removeConditions(colIndex);
    filtersPlugin.addCondition(colIndex, 'contains', [event.target.value]);
    filtersPlugin.filter();
    if (colIndex === 0) {
      this.keySearchText = event.target.value;
    }
    if (colIndex === 1) {
      this.valueSearchText = event.target.value;
    }
    this.hotTableComponent.current.hotInstance.scrollViewportTo(0);
    this.hotTableComponent.current.hotInstance.render();
  }, 10);
  
  var addEventListeners = function (input, colIndex) {
    input.addEventListener('keydown', function(event) {
      debounceFn(colIndex, event);
    });
  };

  // Build elements which will be displayed in header.
  var getInitializedElements = function(colIndex) {
    var div = document.createElement('div');
    var input = document.createElement('input');
    input.placeholder = colIndex === 0 ? 'search key...' : 'search value...'
    div.className = 'filter-header';
    addEventListeners(input, colIndex);
    div.appendChild(input);

    return div;
  };
  
  // Add elements to header on `afterGetColHeader` hook.
  var addInput = function(col, TH) {
    // Hooks can return value other than number (for example `columnSorting` plugin use this).
    if (typeof col !== 'number') {
      return col;
    }
  
    if (col >= 0 && TH.childElementCount < 2) {
      TH.appendChild(getInitializedElements(col));
    }
  };
  
  // Deselect column after click on input.
  var doNotSelectColumn = function (event, coords) {
    if (coords.row === -1 && event.target.nodeName === 'INPUT') {
      event.stopImmediatePropagation();
      this.deselectCell();
    }
  };


  this.hotSettings = {
    data: Handsontable.helper.createSpreadsheetData(5, 5),
    colHeaders: true,
    colWidths: [300, 400],
    width: '100%',
    height: '60vh',
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
    afterGetColHeader: addInput,
    beforeOnCellMouseDown: doNotSelectColumn,
    filters: true,   
  };
  this.hotTableComponent = React.createRef();
    
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
        return 0;
      } else if (this.stateKeysCount[key] > 1) {
        this.stateKeysCount[key] = this.stateKeysCount[key] - 1;
        return this.stateKeysCount[key];
      } else {
        console.warn('Trying to remove no existing key: ', key);
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      //If the table is already filtering, no need to make a render, as this render is being forced by the call to netlify onChange() call.
      if (this.keySearchText || this.valueSearchText) {
        return false;
      }
      return true;
    }
   componentDidMount() {
    const updateDataInNetlify = () => {
      //if no errors then call to update to be able to publish changes
      if (this.checkNoErrors()) {
        let finalObjectValue = {};
        for (var i=0; i < this.stateValue.length; i++) {
          finalObjectValue[this.stateValue[i].key || ''] = this.stateValue[i].value;
        }
        this.props.onChange(finalObjectValue)
      }
    }

    if(this.hotTableComponent.current) {
      this.hotTableComponent.current.hotInstance.addHook('afterRemoveRow', (changes, source)=> {
        // Timeout to evict handsome table error
        setTimeout(()=> updateDataInNetlify(), 10);
      });
      this.hotTableComponent.current.hotInstance.addHook('afterChange', (changes, source)=> {
        if (!changes) { return }
        const instance = this.hotTableComponent.current.hotInstance;
        //instance.toPhysicalRow
        const changeEvents = ['edit', 'CopyPaste.paste']
        if (changeEvents.includes(source)) {
          changes.forEach((change)=> {
            let index,colName,oldValue,newValue;
            [index,colName,oldValue,newValue] = change;
            if (oldValue !== newValue) {
              if (colName === 'key') {
                const findKeyIndexes = (keyToFound)=> {
                  const keyIndexes = [];
                  let keyColumnRowsArray = instance.getDataAtCol(0);
                  keyColumnRowsArray.forEach((key, keyIndex)=> {
                    if (key === keyToFound) {
                      keyIndexes.push(keyIndex);
                    }
                  });
                  return keyIndexes.length > 1 ? keyIndexes : keyIndexes[0];
                }
                const keyAlreadyExists = this.stateKeysCount[newValue];
                if (keyAlreadyExists) {
                  const keyIndexes = findKeyIndexes(newValue);
                  keyIndexes.forEach((duplicatedKeyIndex)=> {
                    let cell= instance.getCellMeta(duplicatedKeyIndex, 0);
                    cell.valid = false;
                    cell.comment = { value: 'No duplicate keys allowed!'};
                    this.setKeyCount(newValue, keyIndexes.length);
                  });
                } else {
                  let cell= instance.getCellMeta(index, 0);
                  cell.valid = true;
                  cell.comment = {};
                  this.setKeyCount(newValue, 1);
                }
                if (oldValue) {
                  const remainCount = this.removeKeyCount(oldValue);
                  if (remainCount === 1) {
                    const oldValueKeyIndex = findKeyIndexes(oldValue);
                    let cell= instance.getCellMeta(oldValueKeyIndex, 0);
                    cell.valid = true;
                    cell.comment = {};
                  }
                }
                // Once all the changes proccesed, render to see changes in affected cells
                instance.render()
              }
            }
          })
          // Try to save changes if no errors -> also for 'value' colName changes and remove rows! not only editions of 'key' colname
          updateDataInNetlify();
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

    const fileFolder = this.props.collection.get('folder');
    const filePath = this.props.entry.get('path');
    const fileName = this.props.entry.get('slug');
    const status = this.props.entry.get('status');

    const isNewRecord = this.props.entry.get('newRecord');
    const collectionFieldsArray = JSON.parse(JSON.stringify(this.props.collection.get('fields')));
    const collectioni18EditorWidgetField = collectionFieldsArray.find((el)=> el.widget === 'i18nEditor');
    const JSONFilePropName = collectioni18EditorWidgetField.name;

    if (typeof value === 'object' && value !== null) {
      if(value._root) {        
        const receivedObject = JSON.parse(this.props.entry.get('raw'));
        this.stateValue = this.convertToFlatArray(receivedObject[JSONFilePropName]);
      } else {
        // Initialize the table object to have at least 1 empty row
        if(!this.stateValue.length) {
          this.stateValue.push({key: '', value: ''})
        }
      }
    }
    
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
