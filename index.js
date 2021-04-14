require('dotenv').config()
const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');
const bmiAnswer = require('./bmiAnswer');

const { TOKEN } = process.env;
const bot = new Telegraf(TOKEN);

const createScene = new WizardScene('create',
  (ctx)=>{
    ctx.reply('Шаг 1. Введите Ваш Вес в килограммах:')
    return ctx.wizard.next();
  },

  (ctx)=>{
    ctx.wizard.state.weight = parseInt(ctx.message.text, 10);
    ctx.reply('Шаг 2. Введите Ваш рост в сантиметрах:');
    return ctx.wizard.next();
  },

  (ctx)=>{
    ctx.wizard.state.height = parseInt(ctx.message.text, 10) / 100;
    const weight = ctx.wizard.state.weight;
    const height = ctx.wizard.state.height;
    const bmi = (parseInt((weight / height / height) * 100)) / 100;

    ctx.reply(`Ваш индекс массы тела ${bmi} - ${bmiAnswer(bmi)}`);
    ctx.reply(`Спасибо! Хотите рассчитать еще раз? Жмите /start `)
    return ctx.scene.leave();
  }
);

const stage = new Stage();
stage.register(createScene);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => ctx.scene.enter('create'));

bot.launch().
then(res => console.log('Started'))
.catch(err => console.log(err));
