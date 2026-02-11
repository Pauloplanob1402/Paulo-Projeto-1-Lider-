{ pkgs, ... }: {
  # Canal mais recente para evitar erros de versão do Node (Unsupported engine)
  channel = "stable-24.11"; 

  packages = [ 
    pkgs.nodejs_20 
    pkgs.jdk21_headless
    pkgs.gradle
    pkgs.ngrok # Adicionado para garantir o túnel do Expo
  ];

  env = { 
    EXPO_USE_FAST_RESOLVER = "1"; 
  };

  idx = {
    extensions = [ "msjsdiag.vscode-react-native" ];
    
    workspace = {
      onCreate = {
        # Instalação forçada das dependências essenciais para o seu plano gratuito
        setup = ''
          npm install && \
          npm install expo@latest react-native-push-notification && \
          npx expo prebuild --platform android
        '';
      };
    };

    previews = {
      enable = true;
      previews = {
        web = {
          command = [ "npm" "run" "web" "--" "--port" "8081" ];
          manager = "web";
        };
      };
    };
  };
}