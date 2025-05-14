# Classroom

Este proyecto tiene la siguiente estructura:

- **frontend**: Carpeta con un proyecto React (creado usando `npm create vite@latest`)
- **backend**: Carpeta con una aplicación FastAPI (usando un entorno virtual para las dependencias)

---

## 📦 Instalación de dependencias

Dentro de cada carpeta, ejecutar los siguientes comandos:

### Frontend

```bash
cd frontend
npm install
npm install lucide-react, react-router-dom
```

### Backend (con entorno virtual activado)

```bash
cd backend
pip install -r requirements.txt
```

## 🚀 Ejecución de los proyectos

### Frontend

```bash
npm run dev
```

### Backend

```bash
uvicorn main:app --reload
```
