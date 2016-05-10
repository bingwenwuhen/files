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
    getFile: function(id) {
        $.ajax({
            type: 'get',
            url: '/get/' + id
        }).done(function(resp){
            if (resp.status == 'success') {
                this.setState({files:[resp.file]});
            }
        }.bind(this));
    },
    downloadFile: function(id) {
        $.ajax({
            type: 'get',
            url: '/download/' + id
        }).done(function(resp){
            if(resp.status == 'success') {
                downloadUrl = resp.url + "?type=download"
                this.setState({url: downloadUrl});
            }
        }.bind(this));
    },
    componentDidMount: function() {
      this.listFile();
    },
    render: function() {
        return(
            <div>
                <iframe width="0px" height="0px" hidden="true" src={this.state.url}></iframe>
                <FileForm getFile= {this.getFile} getFiles={this.listFile}/>
                <FileTable files = {this.state.files} deleteFile={this.deleteFile} downloadFile={this.downloadFile}/>
            </div>
        )
    }
});
module.exports = Files;