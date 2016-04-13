/**
 * Created by xiaxuan on 16/4/5.
 */
var React = require('react');

var FileForm = React.createClass({

    render: function() {
        return(
            <form className="input-group" onSubmit={this.handleSubmit}>
                <input ref="content" className="form-control" id="content" name="content" type="text"/>
                <span className="input-group-btn">
                    <button className="btn btn-default" type="submit">Add</button>
                </span>
            </form>
        )
    }
});

module.exports = FileForm;