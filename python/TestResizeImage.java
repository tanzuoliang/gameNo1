import java.awt.Image;  
import java.awt.image.BufferedImage;  
import java.io.File;  
import java.io.IOException;  
  
import javax.imageio.ImageIO;  
import java.io.IOException;  
 
public class TestResizeImage {  
      

     public static void resizeImage(String srcImgPath, String distImgPath,  
            int width, int height) throws IOException {  
  
        File srcFile = new File(srcImgPath);  
        Image srcImg = ImageIO.read(srcFile);  
        BufferedImage buffImg = null;  
        buffImg = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);  
        buffImg.getGraphics().drawImage(  
                srcImg.getScaledInstance(width, height, Image.SCALE_SMOOTH), 0,  
                0, null);  
        File file = new File(distImgPath);
        if(!file.getParentFile().exists()){
        	file.getParentFile().mkdirs();
        }
        ImageIO.write(buffImg, "PNG", file);  
  
    }  

    public static int toInt(String s){
    	return Integer.parseInt(s);
    }
      
    public static void main(String []args){  
        try {  
        	// System.out.println("len = " + args.length());
            resizeImage(args[0],args[1],toInt(args[2]),toInt(args[2]));  
        } catch (IOException e) {  
        }  
          
    }  
  
}  