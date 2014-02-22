Node Emulator Service Platform
=====

A cloud retro-gaming platform to enable friends and communities to collaborate and stream emulated console games.


#Technology Stack

NodeJS  
MongoDB  
GoInstant  
Node Emulator Services (node-nes)  
and more...  

---
#Platform Terminology

###Micro Instance
This refers to the controller, canvas-sync, and audio-sync streams that connect the players to the process running the ROM.  

---
#node-nes

##source/ui.js
Loads pixel data into canvas among many other things.  

##source/nes.js
Defines, prototypes the JSNES object.  
Lots of initial settings and configurations.  

##source/rom.js
Defines the nes.rom object.  
''load'' reads .nes format rom data and identifies mappers.  
[.NES file format](http://fms.komkon.org/EMUL8/NES.html#LABM)  
''getMirroringType''  
''getMapperName''  
''mapperSupported''  
''createMapper''

##source/cpu.js
Sets up all the opcodes for the 5602 CPU chip.

##source/ppu.js
Emulates the Picture Processing Unit, (ie. the video controller) for the NES.

###endFrame
Draw spr#0 hit coords  
clip sprites or background if needed  
pass ``buffer`` to ``writeFrame``  

###writeFrame
Takes current and previous pixel buffer as input  
Loops over all pixels checking for changes ``(pixel != prevBuffer[i])``  
Use putImageData to populate canvas context with new pixel data  

