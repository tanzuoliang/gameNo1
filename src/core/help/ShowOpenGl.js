var core = core || {};
//物品保存
core.ShowOpenGl = {
	// create a new class
	sprite:null,
	open:function (sp) {
		this.sprite = sp;
			var ccbjs = "res/";
			if(cc.sys.isNative){
				this.shader = new cc.GLProgram(ccbjs + "Shaders/example_Outline_noMVP.vsh", ccbjs + "Shaders/example_Outline.fsh");
				this.shader.link();
				this.shader.updateUniforms();
			}
			else{
				this.shader = new cc.GLProgram(ccbjs + "Shaders/example_Outline.vsh", ccbjs + "Shaders/example_Outline.fsh");
				this.shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
				this.shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
				this.shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

				this.shader.link();
				this.shader.updateUniforms();
				this.shader.use();
				this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('u_threshold'), 1.75);
				this.shader.setUniformLocationWith3f(this.shader.getUniformLocationForName('u_outlineColor'), 0 / 255, 255 / 255, 0 / 255);
			}


			if(cc.sys.isNative){
				var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.shader);
				glProgram_state.setUniformFloat("u_threshold", 1.75);
				glProgram_state.setUniformVec3("u_outlineColor", {x: 0/255, y: 255/255, z: 0/255});
				this.sprite.setGLProgramState(glProgram_state);
			}else{
				this.sprite.shaderProgram = this.shader;
			}


		if(cc.sys.isNative){
			this.sprite.getGLProgramState().setUniformFloat("u_radius", Math.abs(this.sprite.getRotation() / 500));
		}else{
			this.shader.use();
			this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('u_radius'), Math.abs(this.sprite.getRotation() / 500));
			this.shader.updateUniforms();
		}
	},
	
	useOutline : function (sprite,lineWidth,lineColor) {
		if(!this.outShader){
			this.outShader = new cc.GLProgram("res/Shaders3D/SkinnedOutline.vert", "res/Shaders3D/OutLine.frag");
			this.outShader.link();
			this.outShader.updateUniforms();
		}

		var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.outShader);
		glProgram_state.setUniformFloat("OutlineWidth", lineWidth);
		glProgram_state.setUniformVec3("OutLineColor", {x: lineColor.r/255, y: lineColor.g/255, z: lineColor.b/255});
		sprite.setGLProgramState(glProgram_state);
	}
};/**
 * Created by RockLee on 16/6/16.
 */
