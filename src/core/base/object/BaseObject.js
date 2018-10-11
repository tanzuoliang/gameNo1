/**
 * Created by Virtue on 16/6/2.
 */
var core = core || {};

core.BaseObject = cc.Node.extend
(
    {
    className:"BaseObject",
    isPause:false,
    getClassName:function ()
    {
        return this.className;
    },

        pauseTarget:function () {
        if(this.isPause)return;
            this.isPause = true;

          this.pause();

            var arrayRootChildren = this.getChildren();
            var length = arrayRootChildren.length;
            for (var i = 0; i < length; i++) {
                var child = arrayRootChildren[i];
                var children = child.getChildren();
                for(var j=0;j<child.getChildren().length;j++){
                    var res = children[j];
                    if(res.pause){
                        res.pause();
                    }

                    var childtarget = res.getChildren();
                    for(var c=0;c<res.getChildren().length;c++){
                        var resb = childtarget[c];
                        if(resb){
                            if(resb.pause){
                                resb.pause();
                            }
                        }


                        var child1 = resb.getChildren();
                        for(var d=0;d<resb.getChildren().length;d++){
                            var resc = child1[d];
                            if(resc){
                                if(resc.pause){
                                    resc.pause();
                                }
                            }

                        }
                    }



                }
                if(child.pause){
                    child.pause();
                }
            }
        },

        resumeTarget:function () {
            if(!this.isPause)return;
            this.isPause = false;
            this.resume();
            var arrayRootChildren = this.getChildren();
            var length = arrayRootChildren.length;
            for (var i = 0; i < length; i++) {
                var child = arrayRootChildren[i];
                var children = child.getChildren();
                for(var j=0;j<child.getChildren().length;j++){
                    var res = children[j];
                    if(res.resume){
                        res.resume();
                    }

                    var childtarget = res.getChildren();
                    for(var c=0;c<res.getChildren().length;c++){
                        var resb = childtarget[c];
                        if(resb){
                            if(resb.resume){
                                resb.resume();
                            }
                        }


                        var child1 = resb.getChildren();
                        for(var d=0;d<resb.getChildren().length;d++){
                            var resc = child1[d];
                            if(resc){
                                if(resc.resume){
                                    resc.resume();
                                }
                            }

                        }
                    }
                }
                if(child.resume){
                    child.resume();
                }
            }
        }
});


