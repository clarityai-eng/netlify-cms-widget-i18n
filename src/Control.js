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
       collection,
     } = this.props;

     const collectionProps = collection._root.entries;

     return (
       <section>
       <h1>i18n JSON editor</h1>
       <table>
          {[1,2,3].map(column => <tr key={column}>{column}</tr>)}
      </table>
       <input
         type="text"
         id={forID}
         className={classNameWrapper}
         value={value || ''}
         onChange={e => onChange(e.target.value)}
       />
      </section>       
     );
   }
 }