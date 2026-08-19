import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * GarmentMockup v2 — con coordenadas reales de los mockups generados
 *
 * Técnica: la etiqueta base ya viene en blanco/liso en la foto. Se toma
 * esa misma zona en escala de grises como capa de "shading" (luces y
 * sombras reales de la tela) y se aplica sobre el logo del usuario con
 * mix-blend-mode: multiply. Esto NO requiere una capa separada del
 * fotógrafo — se extrae directo de la foto porque la etiqueta ya es blanca.
 *
 * Assets esperados en /public/mockups/saten/:
 *  - cuello_playera_base.jpg + cuello_playera_shading.png
 *  - dobladillo_sudadera_base.jpg + dobladillo_sudadera_shading.png
 *  - cuello_negro_base.jpg + cuello_negro_shading.png
 *
 * Coordenadas en % (relativas al tamaño real de imagen 896x1200px)
 * para que funcionen igual sin importar el tamaño de render en pantalla.
 */

const GARMENT_ZONES = {
  cuello_playera: {
    label: "Cuello de playera",
    baseImage: "/mockups/saten/cuello_playera_base.jpg",
    shadingLayer: "/mockups/saten/cuello_playera_shading.png",
    // zona real: x 258-660, y 495-670 sobre imagen de 896x1200
    zone: { top: "41.25%", left: "28.79%", width: "44.87%", height: "14.58%" },
  },
  dobladillo_sudadera: {
    label: "Dobladillo de sudadera",
    baseImage: "/mockups/saten/dobladillo_sudadera_base.jpg",
    shadingLayer: "/mockups/saten/dobladillo_sudadera_shading.png",
    // zona real: x 322-598, y 495-665
    zone: { top: "41.25%", left: "35.94%", width: "30.80%", height: "14.17%" },
  },
  cuello_negro: {
    label: "Cuello (playera negra)",
    baseImage: "/mockups/saten/cuello_negro_base.jpg",
    shadingLayer: "/mockups/saten/cuello_negro_shading.png",
    // zona real: x 378-517, y 428-528
    zone: { top: "35.67%", left: "42.19%", width: "15.51%", height: "8.33%" },
  },
  // Los hangtags están rotados (excepto el #2), así que su zona necesita
  // un ángulo además de posición/tamaño — ver renderizado condicional abajo.
  colgante_1: {
    label: "Colgante (ángulo 1)",
    baseImage: "/mockups/hangtag/hangtag_1_base.png",
    shadingLayer: "/mockups/hangtag/hangtag_1_shading.png",
    rotatedZone: {
      centerTop: "59.10%",
      centerLeft: "55.14%",
      width: "17.60%",
      height: "58.67%",
      rotate: "35.8deg",
    },
  },
  colgante_2: {
    label: "Colgante (recto)",
    baseImage: "/mockups/hangtag/hangtag_2_base.png",
    shadingLayer: "/mockups/hangtag/hangtag_2_shading.png",
    // este mockup NO está rotado, usa zone normal como los de satén
    zone: { top: "36.67%", left: "33.86%", width: "12.75%", height: "47.30%" },
  },
  colgante_3: {
    label: "Colgante (ángulo 2)",
    baseImage: "/mockups/hangtag/hangtag_3_base.png",
    shadingLayer: "/mockups/hangtag/hangtag_3_shading.png",
    rotatedZone: {
      centerTop: "59.25%",
      centerLeft: "56.44%",
      width: "14.33%",
      height: "47.03%",
      rotate: "49.15deg",
    },
  },
  colgante_4: {
    label: "Colgante (ángulo 3)",
    baseImage: "/mockups/hangtag/hangtag_4_base.png",
    shadingLayer: "/mockups/hangtag/hangtag_4_shading.png",
    rotatedZone: {
      centerTop: "59.15%",
      centerLeft: "54.78%",
      width: "15.18%",
      height: "55.47%",
      rotate: "40.52deg",
    },
  },
};

export default function GarmentMockup({ userLogo, garmentKey = "cuello_playera" }) {
  const [selected, setSelected] = useState(garmentKey);
  const garment = GARMENT_ZONES[selected];

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Selector de prenda */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.entries(GARMENT_ZONES).map(([key, g]) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all active:scale-95 ${
              selected === key
                ? "bg-[#11317B] text-white"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Mockup con capas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="relative w-full rounded-2xl overflow-hidden bg-black/5"
          style={{ aspectRatio: "896 / 1200" }}
        >
          {/* Capa 1: foto base real (ya trae sombras/luz de estudio) */}
          <img
            src={garment.baseImage}
            alt={garment.label}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Caso normal: zona recta (top/left/width/height) */}
          {userLogo && garment.zone && (
            <>
              <img
                src={userLogo}
                alt="Tu logo"
                className="absolute object-cover"
                style={{
                  top: garment.zone.top,
                  left: garment.zone.left,
                  width: garment.zone.width,
                  height: garment.zone.height,
                }}
              />
              <img
                src={garment.shadingLayer}
                alt=""
                aria-hidden
                className="absolute object-cover pointer-events-none"
                style={{
                  top: garment.zone.top,
                  left: garment.zone.left,
                  width: garment.zone.width,
                  height: garment.zone.height,
                  mixBlendMode: "multiply",
                }}
              />
            </>
          )}

          {/* Caso rotado (hangtag colgante): un contenedor centrado que
              carga la rotación completa; adentro, logo + shading SIN
              rotación individual (heredan la del contenedor). Esto evita
              tener que recalcular trigonometría en el navegador. */}
          {userLogo && garment.rotatedZone && (
            <div
              className="absolute overflow-hidden"
              style={{
                top: garment.rotatedZone.centerTop,
                left: garment.rotatedZone.centerLeft,
                width: garment.rotatedZone.width,
                height: garment.rotatedZone.height,
                transform: `translate(-50%, -50%) rotate(${garment.rotatedZone.rotate})`,
              }}
            >
              <img
                src={userLogo}
                alt="Tu logo"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <img
                src={garment.shadingLayer}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * Notas:
 * - Las coordenadas están calculadas de las fotos generadas (896x1200px).
 *   Si regeneras las fotos con otro encuadre, hay que reajustarlas a ojo
 *   comparando con un grid (ver proceso usado para extraerlas).
 * - La imagen "macro_detalle_textura.jpg" NO tiene zona definida aquí a
 *   propósito: úsala para la función de "lupa de materiales" (zoom de
 *   textura), no para overlay de logo, porque el ángulo diagonal complica
 *   el posicionamiento simple.
 * - Para el flip frente/reverso, envuelve este componente con una capa
 *   adicional que aplique rotateY usando hyperframes-animation.
 */
