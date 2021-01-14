import PropTypes from 'prop-types';
 import React from 'react';

 export default class Control extends React.Component {
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
    //  console.log(this.props);
    //  const collectionProps = collection._root.entries;
     const fieldName = field._root.entries[0][1];
     const stateValue = JSON.parse(value || '{}');
     console.log(fieldName, stateValue);
     return (
       <section>
       <h1>i18n JSON editor</h1>
       <table>
         {
           Object.keys(stateValue).map(element => <tr key={element}>
             <td>
             <input
              type="text"
              id={element}
              className={classNameWrapper}
              value={element}
              onChange={e => onChange(e.target.value)}
              />
              </td>
             <td>
             <input
              type="text"
              id={`${element}-value`}
              className={classNameWrapper}
              value={stateValue[element]}
              onChange={e => onChange(e.target.value)}
              />
              </td>
              <td><button>Add row</button></td>
           </tr>)
         }
          {/* {[].map(column => <tr key={column}>{column}</tr>)} */}
      </table>
       {/* <input
         type="text"
         id={forID}
         className={classNameWrapper}
         value={value || ''}
         onChange={e => onChange(e.target.value)}
       /> */}
      </section>       
     );
   }
 }