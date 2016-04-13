/**
 * Created by xiaxuan on 16/4/4.
 */
var React = require("react");
var FileForm = require("./FileForm");
var FileTable = require("./FileTable");


var Files = React.createClass({
    getInitialState: function() {
      return {
          files: []
      }
    },
    listFile: function() {
        $.ajax({
            type: 'get',
            url: '/list'
        }).done(function(resp) {
            if(resp.status == 'success') {
                this.setState({files:resp.files});
            }
        }.bind(this));
    },
    deleteFile: function(id) {
      $.ajax({
          type: 'post',
          url: '/url',
          data: {id: id}
      }).done(function(resp) {
          if (resp.status == 'success') {
              this.listFile();
          }
      }.bind(this));
    },
    render: function() {
        return(
            <div>
                <FileForm />
                <FileTable />
            </div>
        )
    }
});
module.exports = Files;