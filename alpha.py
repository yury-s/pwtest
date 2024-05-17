from PIL import Image

def has_alpha(filename):
    img = Image.open(filename)
    # return img.mode == 'RGBA' or 'transparency' in img.info
    print(img.mode)
    print(img.info)
    return img.mode == 'RGBA' or 'transparency' in img.info

# Example usage
# filename = '/Users/yurys/Downloads/out.png'
filename = '/Users/yurys/sandbox/pwtest/out.png'
if has_alpha(filename):
    print("This image has an alpha channel.")
else:
    print("This image does not have an alpha channel.")

