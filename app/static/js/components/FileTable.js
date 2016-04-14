/**
 * Created by xiaxuan on 16/4/5.
 */
var React = require('react');
var FileItem = require('./FileItem');

var FileTable = React.createClass({

    render: function() {
        var files = this.props.files.map(function(item) {
            return <FileItem />
        });
        return (
            <div>
                <h2>FileMetaData List</h2>
                <table className="table">
                   <thead>
                       <tr>
                           <th>name</th>
                           <th>type</th>
                           <th>length</th>
                           <th>createdAt</th>
                           <th>operation</th>
                       </tr>
                    </thead>
                    <tbody>
                        {files}
                    </tbody>
                </table>
            </div>
        )
    }
});

module.exports = FileTable;