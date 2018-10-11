
import java.awt.Graphics2D;  
import java.awt.Transparency;  
import java.awt.image.BufferedImage;  
import java.io.File;  
import java.io.IOException;  
import java.util.List;  
import java.util.ArrayList;  
  
import javax.imageio.ImageIO;  

public class MergePng{


	public static void append(List<String> inputFileNameList, String outFile) {  
        if (inputFileNameList == null || inputFileNameList.size() == 0) {  
            return;  
        }  
  
        try {  
            boolean isFirstPng = true;  
            BufferedImage outputImg = null;  
            int outputImgW = 0;  
            int outputImgH = 0;  
            for (String pngFileName : inputFileNameList) {  
                if (isFirstPng) {  
                    isFirstPng = false;  
                    outputImg = ImageIO.read(new File(pngFileName));  
                    outputImgW = outputImg.getWidth();  
                    outputImgH = outputImg.getHeight();  
                } else {  
                    BufferedImage appendImg = ImageIO.read(new File(pngFileName));  
                    int appendImgW = appendImg.getWidth();  
                    int appendImgH = appendImg.getHeight();  
  
                    // create basic image  
                    Graphics2D g2d = outputImg.createGraphics();  
                    BufferedImage imageNew = g2d.getDeviceConfiguration().createCompatibleImage(outputImgW, outputImgH,  
                            Transparency.TRANSLUCENT);  
                    g2d.dispose();  
                    g2d = imageNew.createGraphics();  
                      
                    int oldImgW = outputImg.getWidth();  
                    int oldImgH = outputImg.getHeight();  
                    g2d.drawImage(outputImg, 0, 0, oldImgW, oldImgH, null);  
                    g2d.drawImage(appendImg, 0, 0, appendImgW, appendImgH, null);
                
                   
                    g2d.dispose();  
                    outputImg = imageNew;  
                }  
            }  
            
            try {  
                File file = new File(outFile);  
                if(!file.getParentFile().exists()){
                    file.getParentFile().mkdirs();
                }
                ImageIO.write(outputImg, "png", file);  
            } catch (IOException e) {  
                e.printStackTrace();  
            }  

        } catch (Exception e) {  
            e.printStackTrace();  
        }  
    }  


    public static void main(String[] args){
    	String base = args[0];
    	String water = args[1];
    	List<String> list = new ArrayList<String>();
    	list.add(base);
    	list.add(water);

    	String out = args[2];

    	append(list,out);
    }
}