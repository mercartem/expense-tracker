import Salary from '../assets/category/salary.png';
import Interests from '../assets/category/interest.png';
import Business from '../assets/category/business.png';
import Extra from '../assets/category/extra.png';
import Food from '../assets/category/food.png';
import Transport from '../assets/category/transport.png';
import Rent from '../assets/category/rent.png';
import Bills from '../assets/category/bills.png';
import Utilities from '../assets/category/utilities.png';
import Shopping from '../assets/category/shopping.png';
import Entertainment from '../assets/category/entertainment.png';
import Health from '../assets/category/health.png';
import Housing from '../assets/category/house.png';
import Taxes from '../assets/category/tax.png';
import Clothing from '../assets/category/clothing.png';
import Education from '../assets/category/education.png';
import Miscellaneous from '../assets/category/miscellaneous.png';
import Personal from '../assets/category/personal.png'

export const expenseCategoriesIMG = [
  { category: 'Food', img: Food },
  { category: 'Transportation', img: Transport},
  { category: 'Rent', img: Rent },
  { category: 'Bills', img:  Bills},
  { category: 'Utilities', img: Utilities },
  { category: 'Shopping', img: Shopping},
  { category: 'Entertainment', img: Entertainment },
  { category: 'Health Care', img: Health },
  { category: 'Housing', img: Housing},
  { category: 'Taxes', img: Taxes },
  { category: 'Clothing', img: Clothing },
  { category: 'Education', img: Education },
  { category: 'Miscellaneous', img: Miscellaneous },
  { category: 'Personal Care', img: Personal },
];

export const incomeCategoriesIMG = [
  { category: 'Salary', img: Salary },
  { category: 'Interests', img: Interests},
  { category: 'Business', img: Business},
  { category: 'Extra income', img: Extra },
];

// export const expenseCategories = [
//   { category: 'Food', img: '../assets/category/food.png' },
//   { category: 'Transporation', img: '../assets/category/transport.png' },
//   { category: 'Rent', img: '../assets/category/rent.png' },
//   { category: 'Bills', img: '../assets/category/bills.png' },
//   { category: 'Utilities', img: '../assets/category/utilities.png' },
//   { category: 'Shopping', img: '../assets/category/shopping.png' },
//   { category: 'Entertainment', img: '../assets/category/entertainment.png' },
//   { category: 'Health Care', img: '../assets/category/health.png' },
//   { category: 'Housing', img: '../assets/category/house.png' },
//   { category: 'Taxes', img: '../assets/category/tax.png' },
//   { category: 'Clothing', img: '../assets/category/clothing.png' },
//   { category: 'Education', img: '../assets/category/education.png' },
//   { category: 'Miscellaneous', img: '../assets/category/miscellaneous.png' },
//   { category: 'Personal Care', img: '../assets/category/personal.png' },
// ];

// export const incomeCategories = [
//   { category: 'Salary', img: '../assets/category/salary.png' },
//   { category: 'Interests', img: '../assets/category/interest.png' },
//   { category: 'Business', img: '../assets/category/business.png' },
//   { category: 'Extra income', img: '../assets/category/extra.png' },
// ];

export function getIconCategory(category: string, type: string) {
  if (type === 'income') {
    return incomeCategoriesIMG.find((item) => (item.category).toLocaleLowerCase() === category.toLocaleLowerCase())?.img || '';
  }
  if (type === 'expense') {
    return expenseCategoriesIMG.find((item) => (item.category).toLocaleLowerCase() === category.toLocaleLowerCase())?.img || '';
  }
  return '';
}



