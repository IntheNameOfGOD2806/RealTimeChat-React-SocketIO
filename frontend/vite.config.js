import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	
	server: {
	
		proxy: {
			"/api": {
				target: "http://localhost:2806",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
		cors: {
			origin: "http://localhost:5173",
			methods: ["GET", "POST" ,"PUT" ,"DELETE"],
			credentials: true,
		},
	},
});