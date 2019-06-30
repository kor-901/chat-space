# README

## usersテーブル
|Column|Type|Option|Index1|Index2|
|------|----|------|------|------|
|name|string|null: false||●|
|email|string|null: false, unique: true|||

### Association
- has_many :messages
- has_many :members
- has_many :groups, through :members

## groupsテーブル
|Column|Type|Option|Index1|Index2|
|------|----|------|------|------|
|name|string|null: false|||

### Association
- has_many :messages
- has_many :members
- has_many :users, through :members

## membersテーブル
|Column|Type|Option|Index1|Index2|
|------|----|------|------|------|
|user_id|integer|null: false, foreign_key: true|●||
|group_id|integer|null: false, foreign_key: true||●|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Option|Index1|Index2|
|------|----|------|------|------|
|text|text||||
|image|string||||
|user_id|integer|null: false, foreign_key: true|||
|group_id|integer|null: false, foreign_key: true||●|

### Association
- belongs_to :user
- belongs_to :group