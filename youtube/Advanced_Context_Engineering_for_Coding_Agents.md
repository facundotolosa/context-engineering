# Resumen: Advanced Context Engineering for Coding Agents

Este documento resume los puntos clave de la charla de Dex sobre ingeniería de contexto avanzada para agentes de programación.

## 1. El Problema del Retrabajo y el "Slop"
* El uso de IA en bases de código existentes ("brownfield") a menudo resulta en una gran cantidad de retrabajo y código de baja calidad (*slop*).
* Los modelos funcionan bien en proyectos nuevos ("greenfield"), pero sufren en sistemas complejos de larga trayectoria.

## 2. Ingeniería de Contexto
* Es el proceso de gestionar activamente la ventana de contexto para obtener el máximo rendimiento de los modelos actuales.
* **Compactación Intencional:** Consiste en tomar el contexto actual y pedirle al agente que lo resuma en un archivo Markdown antes de iniciar una nueva conversación. Esto permite "limpiar" el ruido y mantener el enfoque.

## 3. La "Zona Inteligente" vs. la "Zona Tonta" (Dumb Zone)
* Alrededor del **40% de la ventana de contexto**, se empiezan a ver rendimientos decrecientes.
* Trabajar en la "Zona Tonta" (con el contexto casi lleno) degrada la capacidad del modelo para seguir instrucciones y llamar a herramientas correctamente.

## 4. Importancia de la Trayectoria
* Los LLM no son puramente deterministas pero son apátridas; se ven influenciados por la trayectoria de la conversación.
* Si el historial está lleno de errores y correcciones (humano regañando a la IA), el modelo tiene más probabilidades de seguir cometiendo errores. A veces es mejor empezar de nuevo con un contexto limpio.

## 5. Sub-agentes para el Control de Contexto
* Los sub-agentes no deben usarse para simular roles humanos (como "agente de front-end"), sino para **controlar el contexto**.
* Un sub-agente puede "bifurcarse" para leer archivos y buscar información, devolviendo solo el resultado esencial al agente principal para mantener su contexto pequeño.

## 6. Flujo de Trabajo RPI (Research, Plan, Implement)
* **Research (Investigación):** Entender cómo funciona el sistema y encontrar los archivos exactos. Se busca la "verdad" basada en el código.
* **Plan (Planificación):** Esquematizar los pasos exactos, incluyendo fragmentos de código y cómo se probará cada cambio. Es la mayor palanca de éxito.
* **Implement (Implementación):** Ejecutar el plan paso a paso, manteniendo el contexto lo más bajo posible.

## 7. No Subcontratar el Pensamiento
* La IA no reemplaza el pensamiento; solo amplifica el pensamiento que el humano ya ha realizado (o la falta del mismo).
* El éxito depende de que el humano esté en el bucle, revisando críticamente la investigación y los planes antes de la ejecución.

## 8. Alineación Mental y Cambio Cultural
* Las revisiones de código y los planes son fundamentales para mantener al equipo alineado sobre la evolución del sistema.
* La adopción de IA debe venir desde el liderazgo para evitar que los ingenieros senior se conviertan en "limpiadores de slop" generado por perfiles junior.
* Es necesario adaptar el SDLC (Ciclo de Vida de Desarrollo de Software) para un mundo donde gran parte del código es generado por IA.

