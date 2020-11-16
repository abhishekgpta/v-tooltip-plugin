
import Tooltip from './tooltip'
const MyPlugin={};

//default Props
const defaultProps={
    position:"auto",
    defaultClass:"tooltip-plugin_container",
    defaultTemplate: '<div class="tooltip-plugin" role="tooltip"><div class="tooltip-plugin_arrow"></div><div class="tooltip-plugin_content"></div></div>',
}

function removeTooltip(el){
    el._tooltip.unmount(el);
}
MyPlugin.install = function (Vue, options={}) {
    // 2. add a global asset
    Vue.directive('my-tooltip', {
      bind (el, binding) {
          try{
            const {value={}} =binding;
            const {text="",position} = value||{};
            //text is not present;
            if(!text){
              throw new Error("Tooltip text not present");
            }
            if(!el){
                throw new Error("Element doest not exist");
            }
            const finalOpts = {
                ...options,
                ...value,
                position
            };
            const props = Object.assign(defaultProps,finalOpts)
            const tooltip= new Tooltip(el, {...props});
            el._tooltip = tooltip;
            return tooltip;
          }
          catch(e){
            console.error("Error ",e.message)
          }
        // some logic ...
      },
      unbind (el) {
        removeTooltip(el)
      },
    })
  
    // 4. add an instance method
    // Vue.prototype.$myMethod = function (methodOptions) {
    //     console.
    //   // some logic ...
    // }
  }
  export default MyPlugin;