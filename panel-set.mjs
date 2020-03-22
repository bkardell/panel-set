(async function(window, document){
  if(typeof window === 'undefined'){ return; }
  const { render, renderTemplates } = await import('./panel-set-helpers.mjs');
  const customElementName = 'panel-set';

  if (!window.customElements.get(customElementName)) {
    window.customElements.define(customElementName,
      class PanelSet extends HTMLElement {
        static get observedAttributes() {
          return [ 'max-panels', 'active-panel' ];
        }

        constructor(){
          super();
          this.root = null;
          this.hasRendered = false;
          this.maxPanels = 6;
          this.activePanel = 1;
        }

        attributeChangedCallback(name, oldVal, newVal){
         if (!newVal) { return }
          const int = parseInt(newVal, 10);
          const isIntegerAndGreaterThanZero = typeof int === 'number' && !isNaN(int) && int > 0;
          if (name === 'max-panels') {  
            this.maxPanels = isIntegerAndGreaterThanZero ? int : this.maxPanels;
          }
          if (name === 'active-panel') {
            this.activePanel = isIntegerAndGreaterThanZero ? int : this.activePanel;
          }
          if(this.root){
            this.root.querySelector('#template-container').innerHTML = renderTemplates(this);
          }
        }

        connectedCallback(){
          if(!this.root) { this.root = this.attachShadow({ mode: 'open' }); }
          window.addEventListener('resize', ()=> render(this));
          render(this);
        }

        disconnectedCallback(){
        }
      }
    );
  }

})(window, document);