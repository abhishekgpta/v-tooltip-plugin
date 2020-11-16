export default function getBoundingClientRect(ele){
    try{
        if(!ele){
            throw new Error("Element doesn't Exist");
        }
        const rectValue = ele.getBoundingClientRect();
        return {
            width:rectValue.width,
            height: rectValue.height,
            x:rectValue.x,
            y:rectValue.y,
            top: rectValue.top,
            bottom: rectValue.bottom,
            left: rectValue.left,
            right: rectValue.right,

        }
    }
    catch(e){
        console.error(`GET bounding client rect:: ${e.message}`);
    }
}
