import * as runtime from "@prisma/client/runtime/client";
const config = {
    "previewFeatures": [],
    "clientVersion": "7.2.0",
    "engineVersion": "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider     = \"prisma-client\"\n  output       = \"../src/generated/prisma\"\n  moduleFormat = \"esm\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel User {\n  id        String   @id @default(uuid())\n  email     String   @unique\n  password  String\n  name      String\n  country   String?\n  createdAt DateTime @default(now())\n\n  jobs          Job[]\n  workerProfile WorkerProfile?\n}\n\nmodel Job {\n  id          String   @id @default(uuid())\n  title       String\n  description String\n  company     String?\n  postedById  String\n  postedBy    User     @relation(fields: [postedById], references: [id])\n  createdAt   DateTime @default(now())\n}\n\nenum ExperienceLevel {\n  BEGINNER\n  INTERMEDIATE\n  PROFESSIONAL\n  EXPERT\n}\n\nmodel WorkerProfile {\n  id         String          @id @default(uuid())\n  userId     String          @unique\n  user       User            @relation(fields: [userId], references: [id])\n  skills     String[]\n  experience ExperienceLevel\n  available  Boolean         @default(true)\n  bio        String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"country\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"jobs\",\"kind\":\"object\",\"type\":\"Job\",\"relationName\":\"JobToUser\"},{\"name\":\"workerProfile\",\"kind\":\"object\",\"type\":\"WorkerProfile\",\"relationName\":\"UserToWorkerProfile\"}],\"dbName\":null},\"Job\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"company\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"postedById\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"postedBy\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"JobToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"WorkerProfile\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToWorkerProfile\"},{\"name\":\"skills\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"experience\",\"kind\":\"enum\",\"type\":\"ExperienceLevel\"},{\"name\":\"available\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"bio\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    }
};
export function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map