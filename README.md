# tenmado-front

テンマドのフロント用ソースコード


# 環境設定

- ローカルコンテナ起動
    ```
    $ docker-compose up [-d]
    ```

- そのコンテナ入る
    ```
    $ docker container exec -it tenmado-front ash
    ```

- そのコンテナ内でパッケージインストール

    `package.json`にあるものをインストール
    ```
    # yarn install
    ```

    新しく追加する
    ```
    # yarn add [パッケージ名]
    ```

- そのコンテナ内でアプリケーションを開発モードで起動
    ```
    # yarn dev
    ```

## 起動時コマンド
+ ``docker-compose run --service-ports vue yarn dev``
+ locathots:3030で確認可能
