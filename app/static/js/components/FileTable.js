/**
 * Created by xiaxuan on 16/4/5.
 */
var React = require('react');
var FileItem = require('./FileItem');

var FileTable = React.createClass({

    render: function() {
        return (
            <div>
                <FileItem/>
            </div>
        )
    }
});
module.exports = FileTable;