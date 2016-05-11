/**
 * Created by Administrator on 2016/5/11.
 */
var React = require('react');
var PagerLink = require("./PagerLink");

var Pager = React.createClass({
    getInitialState: function() {
        return {
            goIndex:''
        };
    },
    getDefaultProps: function() {
        return {
            totalCount:0,
            firstText:'First',
            prevText:'Prev',
            nextText:'Next',
            lastText:'Last',
            showLinkNum:10 ,//�������С��0�����֣���ô����ʾ���ֱ�ǩ
            alwaysShow:true,//����ҳ��ֻ��һҳʱ�Ƿ���ʾ
            goWidth:50,//��ת�����Ŀ��
            recordTextFormat: '{0}/{1}' //{0}��Ӧ��ǰҳ {1}��Ӧ��ҳ�� {2}��Ӧ�ܼ�¼�� �����ϣ����ʾ�˲������ݣ����˲��ָ���ֵ
        };
    },
    callBack:function(index){
        this.props.callBack(index);
    },
    getPageLink: function(p){
        return <PagerLink key={p.Key} text={p.Text} index={p.Index} className={p.ClassName} callBack={this.callBack}/>;
    },
    goIndexChanged:function(e){
        var n = parseInt(e.target.value);
        var v='';
        if(!isNaN(n)&&n>0){
            v= Math.min(n,this.getTotalPages())+'';
        }
        this.setState({goIndex:v});
    },
    getTotalPages:function(){
        return Math.ceil(this.props.totalCount / this.props.pageSize);
    },
    goClicked:function(){
        var idx = ~~this.state.goIndex -1;
        if(idx>=0&& idx!=this.props.pageIndex){
            this.callBack(idx);
            this.setState({goIndex:''});
        }
    },
    render: function() {
        var display='';
        if(!this.props.alwaysShow || this.props.totalCount == 0){
            display = this.props.totalCount<=this.props.pageSize?'none':'';
        }
        var totalPages = this.getTotalPages();
        var arr=[];
        var prevDisplay = 0==this.props.pageIndex?'disabled':'';
        var lastDisplay = totalPages-1==this.props.pageIndex?'disabled':'';
        arr.push(
            this.getPageLink({
                Key : "F",
                Text :  this.props.firstText,
                Index : 0,
                ClassName : prevDisplay
            })
        );
        arr.push(
            this.getPageLink({
                Key : "P",
                Text :  this.props.prevText,
                Index : Math.max(this.props.pageIndex - 1,0),
                ClassName : prevDisplay
            })
        );
        if(this.props.showLinkNum > 0){
            //PageIndex��0��ʼ����
            var startIndex = ~~(this.props.pageIndex / this.props.showLinkNum) * this.props.showLinkNum;
            var endIndex = Math.min(startIndex + this.props.showLinkNum,totalPages);
            for(var i=startIndex;i<endIndex;i++){
                arr.push(
                    this.getPageLink({
                        Key : i,
                        Text :  i + 1,
                        Index : i,
                        ClassName : i==this.props.pageIndex?'active':''
                    })
                );
            }
        }
        arr.push(
            this.getPageLink({
                Key : "N",
                Text :  this.props.nextText,
                Index : Math.min(this.props.pageIndex + 1,totalPages - 1),
                ClassName : lastDisplay
            })
        );
        arr.push(
            this.getPageLink({
                Key : "L",
                Text :  this.props.lastText,
                Index : totalPages - 1,
                ClassName : lastDisplay
            })
        );
        if(totalPages>this.props.showLinkNum){//��ʾ������ת�����
            arr.push(
                <li key="G">
                    <div className="input-group" style={{display:'inline-block',float:'left'}}>
                        <input type="text" className="form-control" maxLength={(totalPages+"").length} value={this.state.goIndex} onChange={this.goIndexChanged} style={{width:this.props.goWidth}} />
                        <span className="input-group-btn" style={{display:'inline-block'}}>
                            <button className="btn btn-default" onClick={this.goClicked} type="button">Go</button>
                        </span>
                    </div>
                </li>
            );
        }
        if(this.props.recordTextFormat.length>0){//��ʾ�ı�
            arr.push(
                <li key="T" style={{marginLeft:5}}>
                    <span>{this.props.recordTextFormat.replace(/\{0\}/g, this.props.pageIndex + 1)
                    .replace(/\{1\}/g, totalPages).replace(/\{2\}/g, this.props.totalCount)}</span>
                </li>
            );
        }
        return (
            <ul className="pagination" style={{margin: '0px 0px',display:display}}>
                {arr}
            </ul>
        );
    }
});
module.exports=Pager;