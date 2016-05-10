/**
 * Created by xiaxuan on 16/4/5.
 */
var React = require('react');

var FileItem = React.createClass({
    handlerDelete: function(id) {
        this.props.deleteFile(id);
    },
    handlerDownload: function(id) {
       this.props.downloadFile(id);
    },

    render: function() {
        var t = this.props.File;
        return (
            <tr>
               <td>{ t.name }</td>
               <td>{ t.type }</td>
               <td>{ t.length }</td>
               <td>{ t.createdAt }</td>
               <td>
                   <button  onClick={this.handlerDelete.bind(this, t.id)} className="btn btn-danger">Delete</button>
               </td>
                <td>
                   <button  onClick={this.handlerDownload.bind(this, t.id)} className="btn btn-danger">Download</button>
               </td>
            </tr>
        )
    }
});
module.exports = FileItem;