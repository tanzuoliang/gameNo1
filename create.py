#encoding=utf-8
import os,re,sys
from helper.respack import PackRes
from myutil.utils import repalceDirName,copyFile,copyDir

"""
svn st | awk '{if ( $1 == "?") { print $2}}' | xargs svn add 
svn add --no-ignore **
"""
p = PackRes("res","res-new")

def checkDir(fr,to):
	ls = []
	for item in os.walk(fr):
		if not item[2]:
			continue
		for f in item[2]:
			if not ".DS" in f:
				ls.append(os.path.join(item[0], f))
	for f in ls:
		ff = f.replace(fr,to)
		if not os.path.exists(ff):
			print	"lose file ",ff
			
def compressRes():
	p.run()
	checkDir("res-new","res")
	print "compress successfully"

def uncompressRes():
	p.resBackToNormal()

def updateVersion():
	path = "publish/android/.version.txt"
	version = 2
	if os.path.exists(path):
		with open(path,"r") as f:
			version = int(f.read()) + 1
	with open(path,"w") as f:
		f.write(str(version))
	
	path = "frameworks/runtime-src/proj.android/res/values/strings.xml"
	
	data = None
	with open(path,"r") as f:
		data = f.read()
#		data = re.sub(r'<integer name="app_version">\d+</integer>', r'<integer name="app_version">%d</integer>'%version,data)
		data = re.sub(r'<string name="app_vname">.+</string>', r'<string name="app_vname">1.0.%d</string>'%version,data)		
	with open(path,"w") as f:
		f.write(data)
		
		
	path = "frameworks/runtime-src/proj.android/AndroidManifest.xml"
	with open(path,"r") as f:
		data = f.read()
		data = re.sub(r'android:versionCode="\d+"', r'android:versionCode="%d"'%version,data)
		
	with open(path,"w") as f:
			f.write(data)		
		
	print version	

			
		
		
"""
去除语言分类重复和资源
"""
def handle_res(root):
	_dir = os.path.join(root,"res/language_img/lang_chs")
	for(_d,_,items) in os.walk(_dir):
		if items:
			for f in items:
				ff = os.path.join(_d,f).replace(_dir + "/","")
				if os.path.exists(ff):
					os.remove(ff)
					print "remove file  ==== ",ff	
					
"""
	编译JSC
"""						
def __decodeJS__(DIR="src"):
	print ""
	if not os.path.exists(os.path.join(DIR, "app.jsc")):
		command = 'cocos jscompile -s' + DIR + ' -d ' + DIR + '_new'
		os.system(command)
		repalceDirName(DIR,DIR + '_new')
		
		

"""
	回到js
"""	
def backToJS(DIR="src"):
	if os.path.exists(os.path.join(DIR, "app.jsc")):
		repalceDirName(DIR,DIR + '_new')
		os.system("rm -rf %s"%(DIR + "_new"))

from myutil.utils import syncDir
"""
	拷贝资源到android-studio项目中
"""		
def copyResFromproject(toPath):
	fromPath = "."
	floder = "res"
#	os.system("rm -rf %s"%(os.path.join(toPath, floder)))
	syncDir(os.path.join(fromPath,floder), os.path.join(toPath, floder))


def handleMainjs():
	if not os.path.exists("mainjs"):
		os.makedirs("mainjs")
	if not os.path.exists("mainjs/main.js") or os.path.getmtime("mainjs/main.js") < os.path.getmtime("main.js"):
		os.system("cp ./main.js ./mainjs/main.js")
		os.system('cocos jscompile -s ./mainjs  -d ./mainjs')

"""
	拷贝代码到android-studio项目中
"""	
def copySrcFromproject(toPath):
	fromPath = "."
	floder = "src"
#	os.system("rm -rf %s"%(os.path.join(toPath, floder)))
	syncDir(os.path.join(fromPath,floder), os.path.join(toPath, floder))
	
	
	handleMainjs()
	
	main_js = os.path.join(toPath, "main.js")
	if os.path.exists(main_js):
		os.system('rm %s'%main_js)
	os.system("cp mainjs/main.jsc %s"%os.path.join(toPath, "main.jsc"))
	print "copy mainjs/main.jsc == > ",os.path.join(toPath, "main.jsc")
	
	"""
	check script
	"""
	script_path = "frameworks/cocos2d-x/cocos/scripting/js-bindings/script"
	script_path_to =  "frameworks/runtime-src/proj.android-studio/app/assets/script"
	if not os.path.exists(script_path_to):
		copyDir(script_path, script_path_to)

"""
	回到正常模式下
"""	
def toNormalStatus():
	uncompressRes()
	backToJS()			
		
#from myutil.utils import getparse
		
from optparse import OptionParser	
	
if __name__ == '__main__':
	"""
	特别注意在选择了平台ios发包成功后 一定要执行python create -p normal -s 0 把资源状态恢复到未处理状态保持和SVN同源
	"""
	
	if len(sys.argv) == 2:
		command = sys.argv[1]
		print command
		
		if command == "compress":
			compressRes()
		elif command == "uncompress":
			uncompressRes()	
		
		sys.exit(0)
	
	parser = OptionParser()
	parser.add_option('-p', '--platform',dest='platform',help='可操作的目标平台：android ios android-studio normal')
#	parser.add_option('--apk', '--apk',dest='apk',help='weather or not create apk file')
	parser.add_option('-s', '--svnup',dest='svnup',help='是否执行SVN获取新数据（包括资源和脚本） 1:执行SVN（默认） 0:不执行')
	parser.add_option('-m', '--mode',dest='mode',help='拷贝资源类型  0:资源和脚本（默认） 1:只拷贝脚本 2: 只拷贝资源')
#	parser.add_option("-a", "--apk",dest='apk',help="是否要创建APK文件 0:不创建（即只编译C++获取.so文件）1:生成APK文件（默认选择）")
#	parser.add_option("-n", "--justApk",dest='justApk',help="只生成APK文件（默认选择）")
	
	parser.add_option("-c", "--compile",dest='compile',help="编译模式1:即只编译C++获取.so文件  2:只生成APK文件（默认选择） 3:包括了1和2")
#	option = getparse([{'name':'p','desc':'platform','help':'android ios android-studio normal'}])
	(option,_) = parser.parse_args()
	print option
	platform = ''
	svnup = option.svnup or '1'
	mode = option.mode or '0'
	
	compileMode = option.compile or '2'
	
	
	if not option.platform:
		platform = raw_input("please input the platform that you want to ready!  android|ios|android-studio|normal\n")
	else:
		platform = option.platform
	
	if platform in ['android','ios','android-studio','normal']:
		toNormalStatus()
		
		if platform == "normal":
#			toNormalStatus()
			sys.exit(0)
		
		if svnup == '1':
			os.system("svn up res && svn up src && svn up project.json && svn up main.js")
#		handle_res(".")
		compressRes()
		if platform == 'ios':
			__decodeJS__()
			pass
		elif platform == 'android':
			"""
				 修改了coocs2d-x-V/tools/cocos2d-console/plugins/plugin_compile/build_android.py
				old:
					if self._project._is_js_project():
						compile_obj.compile_js_scripts(assets_dir, assets_dir)
					
				now if self._project._is_js_project():
					if not no_apk:
					    compile_obj.compile_js_scripts(assets_dir, assets_dir)

			"""
			if compileMode == "1":
				os.system('cocos compile -p android -m release --no-apk True')#release
#				os.system('cocos compile -p android --no-apk True')#debug
				copyDir("frameworks/runtime-src/proj.android/libs/armeabi","frameworks/runtime-src/proj.android-studio/app/ibs/armeabi")
			elif compileMode == '2':
				"""
				 add by tzl --just-apk 只创建APK
				"""
				updateVersion()
				os.system('cocos compile -p android -m release --just-apk 1 && python publish/android/justRun.py')
			elif compileMode == '3':
				updateVersion()
				os.system('cocos compile -p android -m release && python publish/android/justRun.py')
				copyDir("frameworks/runtime-src/proj.android/libs/armeabi","frameworks/runtime-src/proj.android-studio/app/ibs/armeabi")
			else:
				print "compileMode error"		 	
			
			toNormalStatus()
			pass		
		elif platform == 'android-studio':
			__decodeJS__()
			toPath = "frameworks/runtime-src/proj.android-studio/app/assets"
			toMigu = "/Users/tanzuoliang/咪咕/MiGu_TV_50001/Sample/GameSample_Tv_Box/assets"
			if mode == '0':
				copyResFromproject(toPath)
				copySrcFromproject(toPath)
				
#				copyResFromproject(toMigu)
#				copySrcFromproject(toMigu)
				
			elif mode == '1':
				copySrcFromproject(toPath)
				
#				copySrcFromproject(toMigu)
			elif mode == '2':
				copyResFromproject(toPath)
#				copyResFromproject(toMigu)
						
			_ls = ["platform.json","game_version.json","project.json"]
			for f in _ls:
				copyFile(f, os.path.join(toPath, f))
			toNormalStatus()
			pass
#		elif platform == 'normal':
#			toNormalStatus()			
		pass
	else:
		print "the platform must be android|ios|android-studio|normal"	
				