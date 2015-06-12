/**
 * Main function to demonstrate the component usage
 */
$(function(){

  var data = [
    "CREATE YOUR ACCOUNT",
    "BILLING DETAILS",
    "CONFIRM PURCHASE",
    "CHOOSE A PLAN"
  ];

  var stepIndicator= new StepIndicator(null, data);

  $("input[value=next]").on("click",function(){
    stepIndicator.next();
  });
  $("input[value=render]").on("click",function(){
    var steps = [
      {text:"CREATE YOUR ACCOUNT",   state: 2},
      {text:"BILLING DETAILS",       state: 0},
      {text:"CONFIRM PURCHASE",      state: 1},
      {text:"CHOOSE A PLAN",         state: 0}
    ];
    stepIndicator.render(steps);
  });

});


/**
 * A statefull StepIndicator component that supports the api:
 * next() to complete a step and set the next step as current
 * render(steps) to reapply both steps and their states
 * @return {[type]} [description]
 */
var StepIndicator= (function(){

  var STATES = ["NOT-COMPLETED", "CURRENT", "COMPLETED"];

  var StepIndicator= function(el, steps){
    this.initialize(el, steps);
  };

  StepIndicator.prototype= {
    /**
     * set and render the stepIndicator
     * @param  {string} el    a css selector of where we'd like to embed our stepIndicator, defaults to ".step-indicator"
     * @param  {Object} steps either an array of string to show as steps, or an array of objects {text:...,state:...}
     */
    initialize: function(el, steps){
      this.$el= $(el || ".step-indicator");
      // transform simple text array into array of steps objects
      if($.isArray(steps)){
        this.steps= [];
        for(var i=0; i < steps.length; i++){
          this.steps[i]= {text: steps[i], state: (i===0 ? 1:0)};
        }
      }else{
        this.steps= steps;
      }

      this.render();
    },
    /**
     * clears the container and rerenders the entire stepIndicator markup
     * based on the this.steps object which can be optionally override when passed to this function
     * @param  {object} steps [optional] an array of objects {text:...,state:...} to override this.steps
     */
    render: function(steps){
      if(steps){
        this.steps= steps;
      }
      this.$el.empty();
      for(var i=0; i < this.steps.length; i++){
        var stepData= this.steps[i];

        var stepEl= $("<div>");
        stepEl.addClass("step");

        switch(stepData.state) {
          case 0:
            stepEl.addClass("not-completed");
            break;
          case 1:
            stepEl.addClass("current");
            stepEl.append($("<div class=innerCircle></div>"));
            break;
        }
        stepEl.append($("<div class=text>"+stepData.text+"</div>"));
        this.$el.append(stepEl);
      }
    },
    /**
     * will find the current step mark it as completed and set the next one to current
     */
    next: function() {
      for(var i=0; this.steps.length; i++){
        var stepData= this.steps[i];
        if(stepData.state === 1){
          stepData.state= 2;

          var nextStep= Math.min(i+1, this.steps.length - 1);
          this.steps[nextStep].state= 1;
          this.render();
          return;
        }
      }
    }
  };

  return StepIndicator;
})();
