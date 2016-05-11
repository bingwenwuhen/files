/**
 * Created by xiaxuan on 16/4/4.
 */
var React = require("react");
var FileForm = require("./FileForm");
var FileTable = require("./FileTable");
var Pager = require("./Pager");

var Files = React.createClass({
    getInitialState: function() {
      return {
          files: []
      }
    },
    listFile: function(index) {
        $.ajax({
            type: 'get',
            url: '/list/' + index
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
              this.listFile(0);
          }
      }.bind(this));
    },
    getFile: function(name) {
        $.ajax({
            type: 'get',
            url: '/get/' + name
        }).done(function(resp){
            if (resp.status == 'success') {
                console.table(resp.files)
                this.setState({files:resp.files});
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
    getCount: function() {
        $.ajax({
            type: 'get',
            url: '/count'
        }).done(function(resp){
            if(resp.status=='success') {
                this.setState({TotalCount: resp.count, PageSize: 5, PageIndex: 0});
            }
        }.bind(this));
    },
    pageIndexChanged: function(index) {
      this.listFile(index);
        this.setState({PageIndex: index +1})
    },
    componentDidMount: function() {
      this.listFile(0);
      this.getCount();
    },
    render: function() {
         var pagerSetting={
            totalCount:this.state.TotalCount,
            pageSize: this.state.PageSize,
            pageIndex:this.state.PageIndex,
            firstText:"HOME" ,
            prevText:"prev",
            nextText:"next",
            lastText:"last",
            recordTextFormat: "{0}/{1} page total {2} record",
            //showLinkNum:2,
            callBack:this.pageIndexChanged
        };
        return(
            <div>
                <iframe width="0px" height="0px" hidden="true" src={this.state.url}></iframe>
                <FileForm getFile= {this.getFile}/>
                <FileTable files = {this.state.files} deleteFile={this.deleteFile} downloadFile={this.downloadFile}/>
                <div className="panel-body">
                     <Pager {...pagerSetting} />
                </div>
            </div>
        )
    }
});
module.exports = Files;