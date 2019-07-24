(define (earth-planet1 psize pisland ppoles oceanc1 oceanc2 groundc1 groundc2)
  (let*
    (
      (img (car (gimp-image-new psize psize RGB)))
      (oceanLayer (car (gimp-layer-new img psize psize RGB "ocean" 100 NORMAL)))
      (landLayerGround (car (gimp-layer-new img psize psize RGB "ground" 100 DARKEN-ONLY)))
      (landLayerGrass (car (gimp-layer-new img psize psize RGB "grass" 100 NORMAL)))
      (landContinent (car (gimp-layer-new img psize psize RGB "continent" 100 NORMAL)))
      (layerMergeGround 0)
      (continentMask 0)
    )

    ; make oceans
    (gimp-image-add-layer img oceanLayer 2)
    (gimp-palette-set-foreground oceanc1)
    (gimp-palette-set-background oceanc2)
    (plug-in-solid-noise
      RUN-NONINTERACTIVE img oceanLayer     ; mode image drawable
      FALSE                             ; tileable
      FALSE                             ; turbulent
      0                                 ;seed
      15                                ;detail
      4.3 4.5                           ;xsize ysize
    )
    (plug-in-gradmap RUN-NONINTERACTIVE img oceanLayer )

    ; make land
    (gimp-image-add-layer img landLayerGround 0)
    (plug-in-plasma RUN-NONINTERACTIVE img landLayerGround 352928910 4.0)
    (gimp-palette-set-foreground '(199 152 81))
    (gimp-palette-set-background '(65 54 40))
    (plug-in-gradmap RUN-NONINTERACTIVE img landLayerGround)

    ; make grass
    (set! landLayerGrass (car (gimp-layer-copy landLayerGround FALSE)))
    (gimp-image-add-layer img landLayerGrass 1)
    (set! landLayerGrass (car (gimp-item-transform-flip-simple landLayerGrass ORIENTATION-HORIZONTAL TRUE (/ psize))))
    (gimp-palette-set-foreground groundc1)
    (gimp-palette-set-background groundc2)
    (plug-in-gradmap RUN-NONINTERACTIVE img landLayerGrass)

    ; rationalise layer names
    (gimp-item-set-name landLayerGrass "Grass")
    (set! layerMergeGround (car (gimp-image-merge-down img landLayerGround 1)))

    ; continent detail
    (gimp-image-add-layer img landContinent 3)
    (plug-in-solid-noise RUN-NONINTERACTIVE img landContinent
      FALSE TRUE            ; tileable turbulent
      (random 1576424614)   ; random seed
      5                     ; detail level
      6.0 6.0               ; horizontal and vertical texture size
    )
    (if (= pisland TRUE)
      (gimp-threshold landContinent 80 255))
    (if (= pisland FALSE)
      (gimp-threshold landContinent 125 255))


    ; now add mask
    (set! continentMask (car (gimp-layer-create-mask layerMergeGround ADD-BLACK-MASK)))
    (gimp-image-add-layer-mask img layerMergeGround continentMask)
    (gimp-edit-copy landContinent)
    (gimp-floating-sel-anchor (car (gimp-edit-paste continentMask FALSE)))
    (gimp-image-remove-layer img landContinent);
    (set! oceanLayer (car (gimp-image-flatten img)))


    ; add ppoles

     ; now map to sphere
    (plug-in-map-object RUN-NONINTERACTIVE img oceanLayer
             1                     ; Type of mapping (0=plane,1=sphere,2=box,3=cylinder)
             0.5 0.5 2.0           ; viewpoint
             0.5 0.5 0.0           ; object pos
             1.0 0.0 0.0           ; first axis
             0.0 1.0 0.0           ; 2nd axis
             (random 5) (random 5) (random 5)           ; axis rotation
             1 '(255 255 255)      ; Type of lightsource (0=point,1=directional,2=none)and Lightsource color (r,g,b)
             -0.5 -0.5 2           ; light position
             -1.0 -1.0 1.0         ; light direction
             0.3 1.2 0.3 0.2 27.0  ; material (amb, diff, refl, spec, high)
             TRUE                  ; antialias
             FALSE                 ; tile
             FALSE                 ; new image
             TRUE                  ; transparency
             .46                   ; Sphere/cylinder radius (only used when maptype=1 or 3)
             0.5 0.5 0.5           ; box size
             1.00                  ; unused parameter Cylinder length
             -1                    ; Box front face (set these to -1 if not used)
             -1                    ; Box back face
             -1                    ; Box top face
             -1                    ; Box bottom face
             -1                    ; Box left face
             -1                    ; Box right face
             -1                    ; Cylinder top face (unused parameter)
             -1)                   ; Cylinder bottom face (unused parameter)
    (gimp-image-remove-layer img oceanLayer);


    ; finished show image
    (gimp-display-new img)
    (gimp-image-undo-enable img)
  )
)

(script-fu-register "earth-planet1"
                    "earth-planet1"
                    "creates an cloudike planet"
                    "marcus ureilius"
                    "2018 marcus ureilius"
                    "2018"
                    ""
                    SF-VALUE "planet size in pixels"   "400"
                    SF-TOGGLE "large continents"       TRUE
                    SF-TOGGLE "poles"                  TRUE
                    SF-COLOR "ocean color 1"           '(9 196 255)
                    SF-COLOR "ocean color 2"           '(0 38 93)
                    SF-COLOR "ground color 2"          '(86 198 9)
                    SF-COLOR "ground color 2"          '(30 69 36)

)
(script-fu-menu-register "earth-planet1" "<Toolbox>/Marcus/")
