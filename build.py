s=open('index.src.html').read().replace('<!--SPRITES-->',open('_sprites.html').read())
open('index.html','w').write(s)
