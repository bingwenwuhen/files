/**
 * Created by xiaxuan on 16/4/5.
 */
var React = require('react');

var FileForm = React.createClass({

    handleSubmit: function(e) {
        e.preventDefault();
        var content = React.findDOMNode(this.refs.content).value.trim();
        if(!content) {
            return;
        }
        this.props.getFile(content);
    },
    render: function() {
        return(
            <form className="input-group" onSubmit={this.handleSubmit}>
                <input ref="content" className="form-control" id="content" name="content" type="text"/>
                <span className="input-group-btn">
                    <button className="btn btn-default" type="submit">Select</button>
                </span>
            </form>
        )
    }
});

module.exports = FileForm;