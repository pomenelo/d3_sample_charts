library("readr")
library(tidyverse)
library(stringr)
library(dplyr)
data <- read.csv("data.csv")

#SALES
data <- separate(data, col=sales, into=c('sales_usd','sales_unit'), sep = ' ')
data$sales_usd <- as.numeric(gsub("\\$", "", data$sales_usd))
data$sales_usd <- ifelse(data$sales_unit == "M", # condition
                       data$sales_usd/1000,    # what if condition is TRUE
                       data$sales_usd          # what if condition is FALSE
)

#PROFIT
data <- separate(data, col=profit, into=c('profit_usd','profit_unit'), sep = ' ')
data$profit_usd <- as.numeric(gsub("\\$", "", data$profit_usd))
data$profit_usd <- ifelse(data$profit_unit == "M", # condition
                         data$profit_usd/1000,    # what if condition is TRUE
                         data$profit_usd          # what if condition is FALSE
)

#ASSETS
data <- separate(data, col=assets, into=c('assets_usd','assets_unit'), sep = ' ')
data$assets_usd <- gsub(",", "", data$assets_usd)
data$assets_usd <- as.numeric(gsub("\\$", "", data$assets_usd))
data$assets_usd <- ifelse(data$assets_unit == "M", # condition
                          data$assets_usd/1000,    # what if condition is TRUE
                          data$assets_usd          # what if condition is FALSE
)


#MARKETVALUE
data <- separate(data, col=market.value, into=c('market_value_usd','market_value_unit'), sep = ' ')
data$market_value_usd <- gsub(",", "", data$market_value_usd)
data$market_value_usd <- as.numeric(gsub("\\$", "", data$market_value_usd))
data$market_value_unit <- ifelse(data$market_value_unit == "M", # condition
                          data$market_value_unit/1000,    # what if condition is TRUE
                          data$market_value_unit          # what if condition is FALSE
)



data <- data %>%
  rename(
  sales_usd_billion = sales_usd, 
  profit_usd_billion = profit_usd,
  assets_usd_billion = assets_usd,
  market_usd_billion = market_value_usd
  company = global.company
)
sales_unit <- NULL
profit_unit <- NULL
data$market_value_unit <- NULL
data$assets_unit <- NULL

write_csv(data, "data_clean.csv")
