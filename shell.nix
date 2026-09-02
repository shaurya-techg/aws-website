{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_20
    bun
    openssl
    prisma-engines_6
  ];

  shellHook = ''
    export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines_6}/bin/schema-engine"
    export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines_6}/bin/query-engine"
    export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines_6}/lib/libquery_engine.node"
    export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
  '';
}
