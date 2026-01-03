# Resumen: No Vibes Allowed: Solving Hard Problems in Complex Codebases

Este documento resume los puntos clave de la charla de Dex Horthy (HumanLayer) en AI Engineer 2025 sobre cómo resolver problemas complejos en codebases reales usando context engineering avanzado.

## 1. El Problema Fundamental

- **El dilema de las herramientas AI:** Según el estudio de 100,000 desarrolladores presentado en AI Engineer (Junio 2025), las herramientas de AI funcionan excelente en proyectos greenfield (dashboards nuevos, proyectos pequeños), pero fallan significativamente en codebases brownfield (código legacy, proyectos complejos de 10+ años).
- **El costo del "slop":** Los desarrolladores están enviando mucho más código, pero gran parte es retrabajar el código de mala calidad generado la semana anterior. Esto genera una "fábrica de deuda técnica".
- **Experiencia del equipo:** El equipo de HumanLayer logró 2-3x más throughput cambiando completamente su workflow en 8 semanas (equipo de 3 personas). Una vez resuelto, nunca volvieron atrás.

## 2. Context Engineering: La Ventana de Contexto es Todo

- **LLMs son stateless:** No son funciones puras (son no-determinísticos), pero son completamente stateless. La única forma de obtener mejor rendimiento es poner mejores tokens dentro → obtienes mejores tokens fuera.
- **La "Dumb Zone":** Alrededor del 40% de uso de la ventana de contexto (≈168k tokens en Claude), empiezas a ver rendimientos decrecientes. Si usas demasiados MCPs o contexto innecesario, todo tu trabajo ocurre en la "zona tonta" y nunca obtendrás buenos resultados.
- **Optimizar para:** Correctness (información correcta) > Completeness (información completa) > Size (tamaño manejable) > Trajectory (trayectoria positiva).
- **Cuidado con la trayectoria negativa:** Si le dices al agente que se equivocó, se equivoca de nuevo, le gritas, y repites... el LLM aprende que el patrón es "equivocarse y que el humano le grite". La próxima acción más probable será equivocarse de nuevo.

## 3. Compactación Intencional (Intentional Compaction)

- **El concepto:** En lugar de aferrarte a una conversación que se está descarrilando, puedes comprimir el contexto actual en un archivo markdown, revisarlo, etiquetarlo, y luego iniciar un nuevo agente que comienza directamente con ese contexto compactado.
- **Qué compactar:** Archivos relevantes, flujo de código, ediciones de archivos, output de tests y builds. El resultado debe ser: archivos exactos y números de línea que importan para el problema que estás resolviendo.
- **Sub-agents para control de contexto:** NO los uses para antropomorfizar roles (frontend dev, backend dev, QA). Úsalos para controlar el contexto. Por ejemplo, un sub-agent puede hacer toda la exploración y búsqueda en una codebase grande y devolver solo: "el archivo que necesitas está aquí". El agente padre lee ese archivo y comienza a trabajar directamente.

## 4. Research-Plan-Implement (RPI)

La metodología de 3 fases que mantiene tu trabajo en la "zona inteligente":

### Research (Investigación)

- **Objetivo:** Entender cómo funciona el sistema, encontrar los archivos correctos, mantenerse objetivo.
- **Output:** Documento de investigación con contexto comprimido y verdadero basado en el código actual.
- **Enfoque:** Usa sub-agents para tomar "rebanadas verticales" del codebase y construir un snapshot de las partes que realmente importan.

### Plan (Planificación)

- **Objetivo:** Comprimir la intención. Delinear los pasos exactos con nombres de archivos y snippets de código.
- **Valor clave:** **Mental Alignment.** Code review no es solo para encontrar errores, es para mantener al equipo alineado sobre cómo está cambiando el codebase y por qué.
- **Balance:** Hay un sweet spot entre legibilidad y confiabilidad. Planes más largos = más confiabilidad, menos legibilidad. Encuentra tu balance.
- **Incluye:** Pasos explícitos de testing después de cada cambio, snippets de código real (no solo descripciones).

### Implement (Implementación)

- **Objetivo:** Ejecutar el plan manteniendo el contexto bajo.
- **Resultado:** Si el plan es bueno, hasta el modelo más simple debería poder ejecutarlo sin errores.

## 5. Casos de Uso Reales

- **Boundary ML (300k líneas de Rust):** Dex hizo un one-shot fix en un codebase de 300k líneas en un lenguaje de programación nuevo para él. El CTO lo aceptó para el siguiente release sin saber que era un experimento para podcast.
- **BAML (35k líneas en un día):** Dex y Vib enviaron 35,000 líneas de código en 7 horas un sábado. Trabajo estimado: 1-2 semanas de desarrollo manual.
- **Límites:** Intentaron remover dependencias de Hadoop de Parquet Java y fracasaron. En cierto punto tuvieron que volver al whiteboard. La AI no puede reemplazar el pensamiento, solo puede amplificarlo.

## 6. No Externalizar el Pensamiento

- **Verdad fundamental:** AI no puede reemplazar el pensamiento. Solo puede amplificar el pensamiento que has hecho (o la falta de pensamiento que has hecho).
- **Spec-driven development está roto:** El término se ha difundido semánticamente. Ahora significa 100 cosas diferentes para 100 personas diferentes (como pasó con "agentes"). Algunas personas piensan que es solo escribir un prompt más detallado.
- **El humano en el loop es crítico:** Una mala línea de código = una mala línea de código. Una mala línea en un plan = 100 malas líneas de código. Una mala línea en la investigación (malentendido del sistema) = todo el trabajo irá en la dirección equivocada.
- **Mueve el esfuerzo humano al punto de mayor leverage:** Lee los planes mientras se crean. Revisa la investigación. Asegúrate que el approach es correcto antes de implementar.

## 7. Progressive Disclosure y Onboarding de Agentes

- **El problema del onboarding:** Los agentes son como el protagonista de "Memento" - sin memoria. Si no les das contexto, inventarán cosas (alucinaciones).
- **Opción 1 - Documentación por repo:** Poner archivos de contexto en cada repositorio. Problema: se vuelve muy largo y consume toda la "zona inteligente" solo para aprender.
- **Opción 2 - Progressive disclosure:** Dividir el contexto en capas (root context + subcontext según dónde trabajes). Solo cargas lo que necesitas.
- **Mejor opción - On-demand compressed context:** En lugar de documentación que se desactualiza, genera investigación bajo demanda basada en el código real. Estás "comprimiendo verdad" en lugar de mantener documentación que puede contener mentiras.
- **Gráfica de mentiras en el codebase:** Código actual < Nombres de funciones < Comentarios < Documentación (más mentiras/inconsistencias).

## 8. Cuándo Usar RPI (Research-Plan-Implement)

- **Cambiar color de un botón:** Solo habla con el agente, no necesitas RPI.
- **Feature simple:** Tal vez solo planning, sin research.
- **Features medianas (múltiples repos):** Research + Plan + Implement.
- **Problemas más complejos:** Más research, más compaction, más rigor.
- **Aprende con reps:** Te equivocarás muchas veces. A veces irás muy grande, a veces muy pequeño. Es parte del proceso. Elige una herramienta y practica.

## 9. El Futuro: Adaptación de Equipos

- **El verdadero desafío:** La parte técnica (coding agents) se va a commoditizar. El problema difícil es: ¿cómo adaptas tu equipo, workflow y SDLC para un mundo donde 99% del código es generado por AI?
- **El rift emergente:**
  - Staff engineers no adoptan AI porque no los hace mucho más rápidos
  - Mid-level engineers usan mucho AI (llena gaps de habilidades, pero genera algo de slop)
  - Senior engineers odian más el AI cada semana porque están limpiando el slop
- **No es culpa de la AI ni de los mid-levels:** El cambio cultural es difícil y debe venir desde arriba. Si eres líder técnico: elige una herramienta y practica.

## 10. Advertencias y Wisdom Final

- **No hay prompt perfecto:** No hay bala de plata. Necesitas involucrarte, leer los planes, guiar el proceso.
- **Evita herramientas que solo generan markdown:** Algunas herramientas solo generan archivos markdown para hacerte sentir bien sin valor real.
- **Minmaxing es contraproducente:** No intentes usar Claude, Codex, Cursor, y 10 herramientas más al mismo tiempo. Elige una y domínala.
- **RPI puede tener otro nombre:** El nombre no importa. Lo importante es el concepto: compaction, context engineering, staying in the smart zone.
- **Harness engineering:** Otra forma de llamar a la parte de context engineering que involucra cómo te integras con las herramientas (Codex, Claude, Cursor).

## Conclusiones / Puntos de Acción

- **Gestiona tu ventana de contexto agresivamente:** Mantente en la "smart zone" (< 40% de uso de contexto).
- **Usa compactación intencional:** Comprime contexto en archivos markdown revisables antes de iniciar nuevas conversaciones.
- **Adopta Research-Plan-Implement** (o variación similar) para problemas complejos en codebases brownfield.
- **No externalices el pensamiento:** Lee los planes, revisa la investigación, mantente involucrado.
- **Mental alignment es crítico:** Usa planes detallados para mantener a tu equipo alineado sobre cómo evoluciona el codebase.
- **Practica y ajusta:** Necesitas hacer reps para encontrar el balance correcto para tu equipo y codebase.
- **Si eres líder técnico:** Lidera con el ejemplo. Elige una herramienta, aprende a usarla bien, y guía a tu equipo en el cambio cultural.
- **Piensa en el sistema completo:** El verdadero desafío no es técnico, es organizacional. ¿Cómo adaptas tu SDLC para un mundo donde 99% del código es generado por AI?

---

**Fuente:** https://www.youtube.com/watch?v=rmvDxxNubIg  
**Canal:** AI Engineer  
**Duración:** 20:30  
**Speaker:** Dex Horthy, HumanLayer  
**Evento:** AI Engineer 2025

