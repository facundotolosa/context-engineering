# Cursor Training: Context Engineering

## Outline de la Presentación

---

## 🎯 Conceptos Clave a Transmitir

### 1. "Lost in the Middle" Phenomenon

El LLM prioriza información según su posición:

- **Primacy** — Lo que está al INICIO (system prompt, primeros mensajes) → Alta atención
- **Recency** — Lo que está al FINAL (últimos mensajes) → Alta atención
- **El medio se "pierde"** — Los mensajes intermedios reciben menos atención

**Implicación práctica:** En conversaciones largas, la información crucial del medio ya no está siendo procesada correctamente. Esto justifica reiniciar conversaciones periódicamente.

---

### 2. La Trayectoria Importa (Trajectory)

Si el historial está lleno de correcciones y errores:

```
Usuario: "Está mal"
Asistente: *intento fallido*
Usuario: "Sigue mal"
Asistente: *otro intento fallido*
```

El modelo **aprende el patrón "equivocarse"**. La próxima acción más probable será... equivocarse de nuevo.

**🚨 Indicador de sesión muerta:** Cuando la IA responde **"You're absolutely right"** es señal de que está en modo "complacer" en lugar de "resolver". Es hora de empezar un nuevo chat.

**Regla práctica:** Si tienes que corregir al modelo más de 2 veces en el mismo problema → Nueva sesión.

---

### 3. El "Impuesto Invisible" (MCPs y Rules)

Antes de escribir tu primer mensaje, la context window ya tiene contenido:

- System Instructions de Cursor
- Tu archivo `.cursorrules`
- Definiciones de herramientas built-in
- Definiciones de MCPs conectados

**Cada MCP y cada rule añade tokens a CADA request.** Es invisible pero consume espacio valioso.

> Ya visualizado en el Sankey cuando se crea una nueva conversación.

---

### 4. Research → Plan → Implement (RPI)

La metodología que maximiza la calidad del output:

| Fase          | Objetivo                                | Output                            |
| ------------- | --------------------------------------- | --------------------------------- |
| **Research**  | Entender el sistema, encontrar archivos | Documento con contexto comprimido |
| **Plan**      | Comprimir la intención en pasos exactos | Plan detallado con snippets       |
| **Implement** | Ejecutar con contexto mínimo            | Código limpio                     |

**⚠️ El efecto cascada de los errores:**

```
bad research  ──────► bad plan ──────► bad code (MUCHO)
     │                    │
good research ─┬──► bad plan ──────► bad code
               │
               └──► good plan ─┬──► bad code (poco)
                               │
                               └──► good code ✓
```

**Insight crítico:**

- Una mala línea de código = una mala línea de código
- Una mala línea en el plan = 100 malas líneas de código
- Una mala línea en el research = TODO el trabajo va en la dirección equivocada

> Mostrar con el Sankey interactivo cómo el contexto fluye entre fases.

---

## 📊 Diapositivas Interactivas

### Diapositiva 1: Context Engineering vs Prompt Engineering

**Estado:** 🔨 Por implementar

**Mensaje central:** Por más que tengas el mejor prompt del mundo, sin contexto correcto no hay buenos resultados.

#### Prompt Engineering (el enfoque tradicional)

- Se enfoca en **CÓMO preguntas**: estructura, palabras clave, técnicas como Chain-of-Thought
- Útil, pero tiene un techo bajo en codebases complejas
- Ejemplo: "Please think step by step and analyze this code carefully..."

#### Context Engineering (el cambio de paradigma)

- Se enfoca en **QUÉ información proporcionas**: archivos relevantes, documentación, ejemplos
- Es el factor decisivo en la calidad del output
- No importa qué tan elaborado sea tu prompt si los archivos correctos no están en contexto

**Analogía:** Es como pedirle a alguien que arregle tu coche. Puedes explicarle el problema con todo detalle (prompt engineering), pero si no tiene acceso al coche ni a las herramientas (context engineering), no puede hacer nada.

**Frase clave:** _"Garbage In, Garbage Out"_ — Si los archivos relevantes no están, el mejor prompt del mundo no previene alucinaciones.

---

### Diapositiva 2: El Sankey de la Context Window

**Estado:** ✅ Ya implementada

El visualizador principal mostrando cómo se llena la context window con:

- System Instructions
- Cursor Rules
- Built-in Tools
- MCP Tool Definitions
- User Messages
- Assistant Messages
- Tool Reads/Writes

---

### Diapositiva 3: "Lost in the Middle"

**Estado:** 🔨 Por implementar

Visualización de una conversación donde:

- Primeros mensajes → Opacidad 100% (alta atención)
- Mensajes del medio → Opacidad 20-30% (baja atención)
- Últimos mensajes → Opacidad 100% (alta atención)

Objetivo: Simular visualmente cómo el modelo "ve" la conversación.

---

### Diapositiva 4: Research → Plan → Implement

**Estado:** 🔨 Por implementar

Diagrama de flujo mostrando las 3 fases con:

- Loops de revisión humana en cada fase
- Flechas de "Revisions" cuando el humano detecta problemas
- Énfasis en que el Human Review ocurre ANTES de pasar a la siguiente fase

Referencia visual: Diagrama estilo flowchart con diamantes para decisiones humanas.

---

## 💬 Frases Clave para la Presentación

Soundbites memorables para usar durante la sesión:

1. **"Garbage In, Garbage Out"**  
   Si los archivos relevantes no están en contexto, el mejor prompt del mundo no previene alucinaciones.

2. **"La AI no reemplaza el pensamiento, solo lo amplifica"**  
   Amplifica el pensamiento que has hecho... o la falta del mismo.

3. **"Una mala línea en el plan = 100 malas líneas de código"**

4. **"Si tienes que corregir al modelo más de 2 veces, la sesión está muerta"**

---

## 📚 Fuentes

- [Advanced Context Engineering for Coding Agents](https://www.youtube.com/watch?v=...) - Dex Horthy
- [Context Engineering & Coding Agents with Cursor](https://www.youtube.com/watch?v=3KAI__5dUn0) - Lee & Michael (Cursor)
- [From Vibe Coding To Vibe Engineering](https://www.youtube.com/watch?v=JV-wY5pxXLo) - Kitze
- [Most devs don't understand how context windows work](https://www.youtube.com/watch?v=...) - AI Hero
- [No Vibes Allowed: Solving Hard Problems in Complex Codebases](https://www.youtube.com/watch?v=rmvDxxNubIg) - Dex Horthy
