(define (circleText)
  (let*
    (
      (img (car (gimp-image-new 800 600 RGB)))
	  (Layer1 (car (gimp-layer-new img 800 600 RGB "Layer1" 100 NORMAL)))	  
	)
    (gimp-image-add-layer img Layer1 1)

	; set background color
	(gimp-context-set-background '(255 255 255))
	
	; fill layer1 with background color
	(gimp-edit-bucket-fill Layer1 BG-BUCKET-FILL NORMAL-MODE
		100
		255
		FALSE
		400
		300
	)
	
	; make ellipse selection
	(gimp-image-select-ellipse img 0 200 150 400 300)

	; set foreground color
	(gimp-context-set-foreground '(255 0 0))
	
	; fill layer1 with background color
	(gimp-edit-bucket-fill Layer1 FG-BUCKET-FILL NORMAL-MODE
		100
		255
		FALSE
		400
		300
	)
	
	; add course name text
	(gimp-text-fontname img Layer1 180 100 "COMP607 SCRIPT-FU" 0 TRUE 36 PIXELS "arial bold")

	; clear all selections
	(gimp-selection-none img)
	
	; flatten 
	(gimp-image-flatten img)
	
	; display image
	(gimp-display-new img)

   )
)

(script-fu-register "circleText"
					"circleText"
					"circle text script"
					"mark nikora"
					"copyright 2019"
					"Created today"
					""
)
(script-fu-menu-register "circleText" "<Toolbox>/MyScripts")

					