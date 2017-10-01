"use strict"
define("dummy/adapters/application",["exports","active-model-adapter","dummy/config/environment"],function(e,t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default.extend({host:r.default.rootURL+"api"})}),define("dummy/app",["exports","dummy/resolver","ember-load-initializers","dummy/config/environment"],function(e,t,r,l){Object.defineProperty(e,"__esModule",{value:!0})
var n=Ember.Application,a=n.extend({modulePrefix:l.default.modulePrefix,podModulePrefix:l.default.podModulePrefix,Resolver:t.default});(0,r.default)(a,l.default.modulePrefix),e.default=a}),define("dummy/components/code-highlight",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0})
var t=Ember.Component,r=Ember.on
e.default=t.extend({tagName:"pre",highlight:r("didInsertElement",function(){hljs.highlightBlock(this.$("code").get(0))})})}),define("dummy/components/fa-icon",["exports","ember-font-awesome/components/fa-icon"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/fa-list",["exports","ember-font-awesome/components/fa-list"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/fa-stack",["exports","ember-font-awesome/components/fa-stack"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/file-upload",["exports","ember-data-paperclip/components/file-upload"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/upload-form",["exports","dummy/templates/components/upload-form"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=Ember.Component
e.default=r.extend({layout:t.default,tagName:"form",classNames:["form-inline"],actions:{clear:function(){this.element.reset(),this.get("model.photo").clear()},save:function(){this.get("model").save()}}})}),define("dummy/controllers/application",["exports","ember-data-paperclip/utils/data-url","ember-data-paperclip/utils/object-url"],function(e,t,r){Object.defineProperty(e,"__esModule",{value:!0})
var l=Ember.Controller
e.default=l.extend({dataURL:(0,t.default)("model.photo"),objectURL:(0,r.default)("model.photo")})}),define("dummy/helpers/and",["exports","ember-truth-helpers/helpers/and"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=null
Ember.Helper?r=Ember.Helper.helper(t.andHelper):Ember.HTMLBars.makeBoundHelper&&(r=Ember.HTMLBars.makeBoundHelper(t.andHelper)),e.default=r}),define("dummy/helpers/eq",["exports","ember-truth-helpers/helpers/equal"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=null
Ember.Helper?r=Ember.Helper.helper(t.equalHelper):Ember.HTMLBars.makeBoundHelper&&(r=Ember.HTMLBars.makeBoundHelper(t.equalHelper)),e.default=r}),define("dummy/helpers/file-url",["exports","ember-data-paperclip/helpers/file-url"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"fileUrl",{enumerable:!0,get:function(){return t.fileUrl}})}),define("dummy/helpers/gt",["exports","ember-truth-helpers/helpers/gt"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=null
Ember.Helper?r=Ember.Helper.helper(t.gtHelper):Ember.HTMLBars.makeBoundHelper&&(r=Ember.HTMLBars.makeBoundHelper(t.gtHelper)),e.default=r}),define("dummy/helpers/gte",["exports","ember-truth-helpers/helpers/gte"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=null
Ember.Helper?r=Ember.Helper.helper(t.gteHelper):Ember.HTMLBars.makeBoundHelper&&(r=Ember.HTMLBars.makeBoundHelper(t.gteHelper)),e.default=r}),define("dummy/helpers/is-array",["exports","ember-truth-helpers/helpers/is-array"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=null
Ember.Helper?r=Ember.Helper.helper(t.isArrayHelper):Ember.HTMLBars.makeBoundHelper&&(r=Ember.HTMLBars.makeBoundHelper(t.isArrayHelper)),e.default=r}),define("dummy/helpers/is-equal",["exports","ember-truth-helpers/helpers/is-equal"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"isEqual",{enumerable:!0,get:function(){return t.isEqual}})}),define("dummy/helpers/lt",["exports","ember-truth-helpers/helpers/lt"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=null
Ember.Helper?r=Ember.Helper.helper(t.ltHelper):Ember.HTMLBars.makeBoundHelper&&(r=Ember.HTMLBars.makeBoundHelper(t.ltHelper)),e.default=r}),define("dummy/helpers/lte",["exports","ember-truth-helpers/helpers/lte"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=null
Ember.Helper?r=Ember.Helper.helper(t.lteHelper):Ember.HTMLBars.makeBoundHelper&&(r=Ember.HTMLBars.makeBoundHelper(t.lteHelper)),e.default=r}),define("dummy/helpers/not-eq",["exports","ember-truth-helpers/helpers/not-equal"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=null
Ember.Helper?r=Ember.Helper.helper(t.notEqualHelper):Ember.HTMLBars.makeBoundHelper&&(r=Ember.HTMLBars.makeBoundHelper(t.notEqualHelper)),e.default=r}),define("dummy/helpers/not",["exports","ember-truth-helpers/helpers/not"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=null
Ember.Helper?r=Ember.Helper.helper(t.notHelper):Ember.HTMLBars.makeBoundHelper&&(r=Ember.HTMLBars.makeBoundHelper(t.notHelper)),e.default=r}),define("dummy/helpers/or",["exports","ember-truth-helpers/helpers/or"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=null
Ember.Helper?r=Ember.Helper.helper(t.orHelper):Ember.HTMLBars.makeBoundHelper&&(r=Ember.HTMLBars.makeBoundHelper(t.orHelper)),e.default=r}),define("dummy/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("dummy/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("dummy/helpers/xor",["exports","ember-truth-helpers/helpers/xor"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=null
Ember.Helper?r=Ember.Helper.helper(t.xorHelper):Ember.HTMLBars.makeBoundHelper&&(r=Ember.HTMLBars.makeBoundHelper(t.xorHelper)),e.default=r}),define("dummy/initializers/active-model-adapter",["exports","active-model-adapter","active-model-adapter/active-model-serializer"],function(e,t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"active-model-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("adapter:-active-model",t.default),e.register("serializer:-active-model",r.default)}}}),define("dummy/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("dummy/initializers/data-adapter",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"data-adapter",before:"store",initialize:function(){}}}),define("dummy/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("dummy/initializers/export-application-global",["exports","dummy/config/environment"],function(e,t){function r(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var r
if("undefined"!=typeof window)r=window
else if("undefined"!=typeof global)r=global
else{if("undefined"==typeof self)return
r=self}var l,n=t.default.exportApplicationGlobal
l="string"==typeof n?n:Ember.String.classify(t.default.modulePrefix),r[l]||(r[l]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete r[l]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=r,e.default={name:"export-application-global",initialize:r}}),define("dummy/initializers/file",["exports","ember-data-paperclip/initializers/file"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"initialize",{enumerable:!0,get:function(){return t.initialize}})})
define("dummy/initializers/injectStore",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"injectStore",before:"store",initialize:function(){}}}),define("dummy/initializers/store",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"store",after:"ember-data",initialize:function(){}}}),define("dummy/initializers/transforms",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"transforms",before:"store",initialize:function(){}}}),define("dummy/initializers/truth-helpers",["exports","ember-truth-helpers/utils/register-helper","ember-truth-helpers/helpers/and","ember-truth-helpers/helpers/or","ember-truth-helpers/helpers/equal","ember-truth-helpers/helpers/not","ember-truth-helpers/helpers/is-array","ember-truth-helpers/helpers/not-equal","ember-truth-helpers/helpers/gt","ember-truth-helpers/helpers/gte","ember-truth-helpers/helpers/lt","ember-truth-helpers/helpers/lte"],function(e,t,r,l,n,a,o,i,u,d,s,p){function m(){Ember.Helper||((0,t.registerHelper)("and",r.andHelper),(0,t.registerHelper)("or",l.orHelper),(0,t.registerHelper)("eq",n.equalHelper),(0,t.registerHelper)("not",a.notHelper),(0,t.registerHelper)("is-array",o.isArrayHelper),(0,t.registerHelper)("not-eq",i.notEqualHelper),(0,t.registerHelper)("gt",u.gtHelper),(0,t.registerHelper)("gte",d.gteHelper),(0,t.registerHelper)("lt",s.ltHelper),(0,t.registerHelper)("lte",p.lteHelper))}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=m,e.default={name:"truth-helpers",initialize:m}}),define("dummy/instance-initializers/ember-data",["exports","ember-data/instance-initializers/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("dummy/models/product",["exports","ember-data/model","ember-data/attr"],function(e,t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default.extend({name:(0,r.default)("string"),photo:(0,r.default)("file")})}),define("dummy/objects/file",["exports","ember-data-paperclip/objects/file"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("dummy/router",["exports","dummy/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var r=Ember.Router,l=r.extend({location:t.default.locationType,rootURL:t.default.rootURL})
l.map(function(){}),e.default=l}),define("dummy/routes/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0})
var t=Ember.Route
e.default=t.extend({model:function(){return this.get("store").find("product",1)}})}),define("dummy/serializers/application",["exports","active-model-adapter","ember-data-paperclip/mixins/serializer-mixin"],function(e,t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.ActiveModelSerializer.extend(r.default,{})}),define("dummy/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"8IxoOaWy",block:'{"symbols":[],"statements":[[6,"div"],[9,"class","container"],[7],[0,"\\n  "],[6,"div"],[9,"class","page-header"],[7],[0,"\\n    "],[6,"h1"],[7],[0,"Ember Data Paperclip"],[8],[0,"\\n    "],[6,"p"],[9,"class","lead"],[7],[0,"\\n      This addon provides an ember file attribute to use with "],[6,"a"],[9,"href","https://github.com/thoughtbot/paperclip"],[9,"target","_blank"],[7],[0,"rails paperclip"],[8],[0,".\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"h3"],[7],[0,"File URL"],[8],[0,"\\n  "],[6,"div"],[9,"class","row"],[7],[0,"\\n    "],[6,"div"],[9,"class","col-md-6 col-xs-12"],[7],[0,"\\n      "],[4,"code-highlight",null,[["language"],["htmlbars"]],{"statements":[[0,"<img src={{file-url model.photo \'thumbnail\'}} />"]],"parameters":[]},null],[0,"\\n    "],[8],[0,"\\n    "],[6,"div"],[9,"class","col-md-6 col-xs-12"],[7],[0,"\\n      "],[6,"img"],[10,"src",[25,"file-url",[[19,0,["model","photo"]],"thumbnail"],null],null],[7],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","row"],[7],[0,"\\n    "],[6,"div"],[9,"class","col-md-6 col-xs-12"],[7],[0,"\\n      "],[4,"code-highlight",null,[["language"],["htmlbars"]],{"statements":[[0,"<img src={{file-url model.photo}} />"]],"parameters":[]},null],[0,"\\n    "],[8],[0,"\\n    "],[6,"div"],[9,"class","col-md-6 col-xs-12"],[7],[0,"\\n      "],[6,"img"],[10,"src",[25,"file-url",[[19,0,["model","photo"]]],null],null],[7],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"h3"],[7],[0,"Data URL"],[8],[0,"\\n  "],[6,"div"],[9,"class","row"],[7],[0,"\\n    "],[6,"div"],[9,"class","col-md-6 col-xs-12"],[7],[0,"\\n"],[4,"code-highlight",null,[["language"],["javascript"]],{"statements":[[0,"import Ember from \'ember\';\\nimport dataURL from \'ember-data-paperclip/utils/dataURL\';\\n\\nconst { Component } = Ember;\\n\\nexport default Component.extend({\\n  dataURL: dataURL(\'model.photo\')\\n});"]],"parameters":[]},null],[0,"\\n      "],[4,"code-highlight",null,[["language"],["htmlbars"]],{"statements":[[0,"<img src={{dataURL.content}} />"]],"parameters":[]},null],[0,"\\n    "],[8],[0,"\\n    "],[6,"div"],[9,"class","col-md-6 col-xs-12"],[7],[0,"\\n      "],[6,"img"],[10,"src",[20,["dataURL","content"]],null],[7],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"h3"],[7],[0,"Object URL"],[8],[0,"\\n  "],[6,"div"],[9,"class","row"],[7],[0,"\\n    "],[6,"div"],[9,"class","col-md-6 col-xs-12"],[7],[0,"\\n      "],[4,"code-highlight",null,[["language"],["javascript"]],{"statements":[[0,"import Ember from \'ember\';\\nimport objectURL from \'ember-data-paperclip/utils/objectURL\';\\n\\nconst { Component } = Ember;\\n\\nexport default Component.extend({\\n  objectURL: objectURL(\'model.photo\')\\n});"]],"parameters":[]},null],[0,"\\n      "],[4,"code-highlight",null,[["language"],["htmlbars"]],{"statements":[[0,"<img src={{objectURL.content}} />"]],"parameters":[]},null],[0,"\\n    "],[8],[0,"\\n    "],[6,"div"],[9,"class","col-md-6 col-xs-12"],[7],[0,"\\n      "],[6,"img"],[10,"src",[20,["objectURL","content"]],null],[7],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"h3"],[7],[0,"Updating"],[8],[0,"\\n  "],[6,"div"],[9,"class","row"],[7],[0,"\\n    "],[6,"div"],[9,"class","col-md-6 col-xs-12"],[7],[0,"\\n      "],[4,"code-highlight",null,[["language"],["javascript"]],{"statements":[[0,"import Ember from \'ember\';\\n\\nconst { Component } = Ember;\\n\\nexport default Component.extend({\\n  actions: {\\n    clear() {\\n      this.get(\'model.photo\').clear();\\n    },\\n    save() {\\n      this.get(\'model\').save();\\n    }\\n  }\\n});"]],"parameters":[]},null],[0,"\\n      "],[4,"code-highlight",null,[["language"],["htmlbars"]],{"statements":[[0,"{{file-upload file=model.photo}}\\n<button {{action=\'clear\'}}></button>\\n<button {{action=\'save\'}}></button>\\n<img src={{model.photo.data}} />"]],"parameters":[]},null],[0,"\\n    "],[8],[0,"\\n    "],[6,"div"],[9,"class","col-md-6 col-xs-12"],[7],[0,"\\n      "],[1,[25,"upload-form",null,[["model"],[[19,0,["model"]]]]],false],[0,"\\n"],[4,"if",[[25,"and",[[19,0,["model","photo","isDirty"]],[25,"not",[[19,0,["model","photo","isEmpty"]]],null]],null]],null,{"statements":[[0,"        "],[6,"br"],[7],[8],[0,"\\n        "],[6,"img"],[10,"src",[20,["model","photo","data"]],null],[9,"class","img-responsive img-rounded"],[7],[8],[0,"\\n        "],[6,"br"],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"    "],[8],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/templates/application.hbs"}})}),define("dummy/templates/components/code-highlight",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"iiCVU7Xz",block:'{"symbols":["&default"],"statements":[[6,"code"],[9,"style","background-color: transparent; display: inline-block;"],[10,"class",[18,"language"],null],[7],[11,1],[8],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/templates/components/code-highlight.hbs"}})}),define("dummy/templates/components/upload-form",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"zFKo3/T6",block:'{"symbols":[],"statements":[[6,"div"],[9,"class","form-group"],[7],[0,"\\n  "],[1,[25,"file-upload",null,[["file","class"],[[19,0,["model","photo"]],"btn btn-default form-control"]]],false],[0,"\\n"],[8],[0,"\\n"],[6,"div"],[9,"class","form-group"],[7],[0,"\\n  "],[6,"button"],[9,"class","btn btn-default form-control"],[3,"action",[[19,0,[]],"clear"]],[7],[0,"Clear"],[8],[0,"\\n"],[8],[0,"\\n"],[6,"div"],[9,"class","form-group"],[7],[0,"\\n  "],[6,"button"],[9,"class","btn btn-default form-control"],[10,"disabled",[20,["model","isSaving"]],null],[3,"action",[[19,0,[]],"save"]],[7],[0,"\\n    Save\\n"],[4,"if",[[19,0,["model","isSaving"]]],null,{"statements":[[0,"      "],[6,"i"],[9,"class","fa fa-spin fa-spinner"],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/templates/components/upload-form.hbs"}})}),define("dummy/transforms/file",["exports","ember-data","dummy/config/environment"],function(e,t,r){Object.defineProperty(e,"__esModule",{value:!0})
var l=Ember.isEmpty,n=Ember.assign,a=Ember.getOwner,o=t.default.Transform
e.default=o.extend({deserialize:function(e,t){return a(this).factoryFor("object:file").create(n({},e,r.default.paperclip,t,{isNew:l(e),isEmpty:l(e),attributes:Object.keys(e||{})}))},serialize:function(e){return e.serialize()}})}),define("dummy/config/environment",["ember"],function(e){var t={default:{modulePrefix:"dummy",environment:"production",rootURL:"/ember-data-paperclip/",locationType:"hash",EmberENV:{FEATURES:{},EXTEND_PROTOTYPES:{Date:!1}},APP:{},paperclip:{path:":class/:id/:attachment/:style.png"},exportApplicationGlobal:!1}}
return Object.defineProperty(t,"__esModule",{value:!0}),t}),runningTests||require("dummy/app").default.create({})