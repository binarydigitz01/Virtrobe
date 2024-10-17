let
  pkgs = import <nixpkgs> {};
in pkgs.mkShell {
  packages = [
    (pkgs.python3.withPackages (python-pkgs: with python-pkgs; [
      streamlit
      fuzzywuzzy
      google-generativeai
      pillow
      numpy
      opencv4
    ]))
  ];
}
