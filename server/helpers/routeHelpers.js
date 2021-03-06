import Joi from '@hapi/joi';

export const validateParam = (schema, name) => {
    return (req, res, next) => {
        const result = Joi.validate({
            param: req.params[name]
        }, schema)
        if (result.error) {
            return res.status(400).json(result.error)
        } else {
            if (!req.value) req.value = {}
            if (!req.value.params) req.value.params = {}
            req.value.params[name] = result.value.param
            next()
        }
    }
}

export const validateBody = schema => {
    return (req, res, next) => {
        const result = Joi.validate(req.body, schema)
        if (result.error) {
            return res.status(400).json(result.error)
        } else {
            if (!req.value) req.value = {}
            if (!req.value.body) req.value.body = {}
            req.value.body = result.value
            next()
        }
    }
}

export const schema = {
    test: {
        post: Joi.object().keys({
            name: Joi.string().required()
        }),
        put: Joi.object().keys({
            name: Joi.string().required()
        }),
        patch: Joi.object().keys({
            name: Joi.string()
        })
    },
    role: {
        post: Joi.object().keys({
            name: Joi.string().required(),
            color: Joi.string().required().regex(/#([0-9a-f]{6}|[0-9a-f]{3})/i)
        }),
        put: Joi.object().keys({
            name: Joi.string().required(),
            color: Joi.string().required().regex(/#([0-9a-f]{6}|[0-9a-f]{3})/i)
        }),
        patch: Joi.object().keys({
            name: Joi.string(),
            color: Joi.string().regex(/#([0-9a-f]{6}|[0-9a-f]{3})/i)
        })
    },
    id: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-Z]{24}$/).required()
    }),
    user: {
        post: Joi.object().keys({
            login: Joi.string().required(),
            password: Joi.string().required().regex(/^[a-zA-Z0-9]{6,}$/),
            role: Joi.array().required()
        }),
        put: Joi.object().keys({
            login: Joi.string().required(),
            password: Joi.string().required().regex(/^[a-zA-Z0-9]{6,}$/),
            role: Joi.array().required()
        }),
        patch: Joi.object().keys({
            login: Joi.string(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,}$/),
            role: Joi.array()
        })
    }
};