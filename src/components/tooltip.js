import {getBoundingClientRect} from './utils';

const EVE1="mouseenter";
const EVE2="mouseleave";
const classMap={
    top:"tooltip-plugin_arrow_bottom",
    bottom:"tooltip-plugin_arrow_top",
    left:"tooltip-plugin_arrow_right",
    right:"tooltip-plugin_arrow_left",
}
class Tooltip {
    constructor(ele, props){
        this.ele = ele;
        this.props = props;
        this.show = false;
        this.tooltipNode = null;

        this._initialize();
    }
    _initialize(){
        const func1 = (e)=>{
            if(this.show)return;
            this.showTooltip(e);
        }
        const func2 = (e)=>{
            if(!this.show)return;
            this.hideTooltip(e);
        }
        //setEventlistner
        this.ele.addEventListener(EVE1,func1);
        this.ele.addEventListener(EVE2,func2);
    }
    createTooltipNode(){
        const tooltipGenerator = window.document.createElement('div');
        const {defaultTemplate} = this.props;
        tooltipGenerator.innerHTML = defaultTemplate.trim();
        const tooltipNode = tooltipGenerator.childNodes[0];
        const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const uniqid = randLetter + Date.now();
        tooltipNode.id = `tooltip_${uniqid}`;
        this.ele.parentNode.append(tooltipGenerator);
        return tooltipNode;
    }
    addContent(){
        const {text=""} = this.props;
        if(this.tooltipNode && text){
            //TODO::move classes to props;
            const titleNode = this.tooltipNode.querySelector(".tooltip-plugin_content");
            var textNode = document.createTextNode(text);
            titleNode.appendChild(textNode);
        }
    }
    positionTooltip(){
        const posObject = getBoundingClientRect(this.ele);
        const {position} = this.props;
        switch(position){
            case "top":
                this.positionTop(posObject);
                return;
            case "bottom":
                this.positionBottom(posObject);
                return;
            case "left":
                this.positionLeft(posObject);
                return;
            case "right":
                this.positionRight(posObject);
                return;        
            default:
                this.positionDefault(posObject);
                return;
        }
    }

    positionFlip(posObject,dir){
        this.props.position = dir;
        switch(dir){
            case "top":
                this.positionTop(posObject);
                return;
            case "bottom":
                this.positionBottom(posObject);
                return;    
            case "right":
                this.positionRight(posObject)
                return;
            case "left":
                this.positionLeft(posObject);
        }
    }    
    positionDefault(posObject){
        //find suitaible position in order top bottom, right, left
        const tooltipPostObject = getBoundingClientRect(this.tooltipNode);
        const docElePostObject = getBoundingClientRect(document.documentElement);

        if(posObject.y > (tooltipPostObject.height+5)){ //top
            this.props.position="top";
            this.positionTop(posObject);
            return;
        }
        if((docElePostObject.height-posObject.bottom) > (posObject.y+posObject.height+5)){ //bottom
            this.props.position="bottom";
            this.positionBottom(posObject);
            return;
        }
        if(posObject.x > (tooltipPostObject.width-5)){//left
            this.props.position="left";
            this.positionLeft(posObject);
            return;
        }
        if((docElePostObject.width-posObject.right) > (posObject.x+posObject.width+5)){ //right
            this.props.position="right";
            this.positionRight(posObject);
            return;
        }
        this.props.position="bottom";
        //just show it in the bottom
        this.positionBottom(posObject);
        return;
        
    }
    positionTop(posObject){
        const tooltipPostObject = getBoundingClientRect(this.tooltipNode)
        //check if distance between top viewport and element is greated than tooltip+arrow height
        if(posObject.y > (tooltipPostObject.height+5)){
            this.tooltipNode.style.top=(posObject.y-tooltipPostObject.height-5)+"px";
            this.tooltipNode.style.left=(posObject.x+posObject.width/2)+"px";
            this.positionArrowBottom(posObject,tooltipPostObject);
        }
        else{
            this.positionFlip(posObject,"bottom")
        }
    }
    positionBottom(posObject){
        const docElePostObject = getBoundingClientRect(document.documentElement);
        if((docElePostObject.height-posObject.bottom) > (posObject.y+posObject.height+5)){
            this.tooltipNode.style.top=(posObject.y+posObject.height+5)+"px";
            this.tooltipNode.style.left=(posObject.x+posObject.width/2)+"px";
            this.positionArrowTop(posObject);
        }
        else{
            this.positionFlip(posObject,"top");
        }

    }
    positionLeft(posObject){
        const tooltipPostObject = getBoundingClientRect(this.tooltipNode)
        if(posObject.x > (tooltipPostObject.width-5)){
            this.tooltipNode.style.left = (posObject.x-tooltipPostObject.width-5)+"px";
            this.tooltipNode.style.top = ((posObject.y+posObject.height/3))+"px";
            this.positionArrowRight(tooltipPostObject);
        }
        else{
            this.positionFlip(posObject,"right");
        }
    }
    positionArrowRight(tooltipPostObject){
        const {position} = this.props;
        const arrowNode = this.tooltipNode.querySelector(".tooltip-plugin_arrow");
        this.setClass(arrowNode,position);
        arrowNode.style.top=(10)+"px";
        arrowNode.style.left=(tooltipPostObject.width)+"px";
    }
    positionRight(posObject){
        const docElePostObject = getBoundingClientRect(document.documentElement);
        if((docElePostObject.width-posObject.right) > (posObject.x+posObject.width+5)){
            this.tooltipNode.style.left = (posObject.x+posObject.width+5)+"px";
            this.tooltipNode.style.top = ((posObject.y+posObject.height/3))+"px";
            this.positionArrowLeft(posObject);
        }
        else{
            this.positionFlip(posObject,"left");
        }

    }
    positionArrowLeft(){
        const {position} = this.props;
        const arrowNode = this.tooltipNode.querySelector(".tooltip-plugin_arrow");
        this.setClass(arrowNode,position);
        arrowNode.style.top=(10)+"px";
        arrowNode.style.left=(-10)+"px";
    }
    positionArrowBottom(posObject,tooltipPostObject){
        const {position} = this.props;
        const arrowNode = this.tooltipNode.querySelector(".tooltip-plugin_arrow");
        this.setClass(arrowNode,position);
        arrowNode.style.left=(10)+"px";
        arrowNode.style.top=(tooltipPostObject.height)+"px";
    }
    positionArrowTop(){
        const {position} = this.props;
        const arrowNode = this.tooltipNode.querySelector(".tooltip-plugin_arrow");
        this.setClass(arrowNode, position);
        arrowNode.style.left=(10)+"px";
        arrowNode.style.top="-9px";
    }
    setClass(arrowNode, position) {
        let classNames = arrowNode.className;
        let classList = [];
        if (classNames) {
            classList = classNames.split(" ");
        }
        if(classList.indexOf(classMap[position]) === -1 ){
            classList.push(classMap[position]);
        }
        
        arrowNode.setAttribute('class', classList.join(' '));
    }

    /**
     * @param {EventListenerObject} e
     * show tooltip 
     */
    showTooltip(){
        //show Tooltip
        if(this.show){
            return;
        }
        if(!this.tooltipNode){
            this.tooltipNode = this.createTooltipNode();
            this.addContent();
            
        }
        
        this.tooltipNode.style.display = "block";
        this.positionTooltip();
        this.show = true;
    }
    /**
     * 
     * @param {EventListenerObject} e
     * hide tooltip already visible 
     */
    hideTooltip(){
        //hideTooltip
        if(!this.tooltipNode){
            return;
        }
        this.tooltipNode.style.display="none";
        this.show = false;
    }
    unmount(){
        this.ele.removeEventListener(EVE1,this.disableTooltip);
        this.ele.removeEventListener(EVE1,this.disableTooltip);
    }
    disableTooltip(){

    }
}

export default Tooltip;