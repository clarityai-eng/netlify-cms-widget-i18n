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
      colWidths: [300, 300],
      comments: true,
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
    this.stateValidations = [];
    // this.stateHaveBeenPublished = false;
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
     return !this.stateValidations.length;
   }
   componentDidMount() {
    if(this.hotTableComponent.current) {
      this.hotTableComponent.current.hotInstance.addHook('afterChange', (changes, source)=> {
        //after every change, run validation on the "0 column"
        const instance = this.hotTableComponent.current.hotInstance;
        this.stateValidations = [];
        let keyColumnRowsArray = instance.getDataAtCol(0);
        keyColumnRowsArray.forEach((value, row)=> {
          let data = Object.assign([], keyColumnRowsArray);
          let index = data.indexOf(value);
          data.splice(index, 1);
          let second_index = data.indexOf(value);
          let cell= instance.getCellMeta(row, 0);
          if (index > -1 && second_index > -1 && !(value == null || value === '')) {
              cell.valid = false
              cell.comment = { value: 'No Duplicate Value allowed !!!'}
              this.stateValidations.push({rowIndexes: [index, second_index], error: 'DUPLICATED'});
          } else {
              cell.valid = true
              cell.comment = ''
          }
        });
        //force a re-render so the new cell properties show up
        instance.render()
        //if no errors then call to update to be able to publish changes
        console.log(this.stateValidations)
        console.log(this.state)

        if (!this.stateValidations.length && changes) {
          let finalObjectValue = {};
          for (var i=0; i < this.stateValue.length; i++) {
            finalObjectValue[this.stateValue[i].key || ''] = this.stateValue[i].value;
          }
          console.log('llamada a change', finalObjectValue)
          this.props.onChange(finalObjectValue)
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
    if (typeof value === 'object' && value !== null) {
      if(value._root) {
        this.stateValue = Array.from(this.props.value.entries()).map(([key, value]) => ({key: key || '', value}));
        console.log('created initial object')
      }
    } else {
      // Initialize the table object to have at least 1 empty row
      if(!this.stateValue.length) {
        this.stateValue.push({key: '', value: ''})
      }
    }
    console.log('props',this.props)
    console.log('entry',this.props.entry.get('path'));
    console.log('raw',this.props.entry.get('raw'));

    const fileFolder = this.props.collection.get('folder');
    const filePath = this.props.entry.get('path');
    const fileName = this.props.entry.get('slug');
    const status = this.props.entry.get('status');

    const isNewRecord = this.props.entry.get('newRecord');
    const collectionFieldsArray = JSON.parse(JSON.stringify(this.props.collection.get('fields')));
    const collectioni18EditorWidgetField = collectionFieldsArray.find((el)=> el.widget === 'i18nEditor');
    const JSONFilePropName = collectioni18EditorWidgetField.name;

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
          {<div>The name of the prop in the JSON file is: {JSONFilePropName}</div>}
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
