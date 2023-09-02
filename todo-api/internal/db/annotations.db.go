package db

import (
	"fmt"
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DbConnection() {
	var err error
	db, err = gorm.Open(sqlite.Open("sqlite3/annotations.db"), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
		panic("failed to connect database")
	}

	fmt.Println("Connected to DB")
}

func GetDB() *gorm.DB {
	return db
}
