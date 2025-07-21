import z from 'zod'


const UserBody = z.object({
    firstName: z.string(),
    lastName: z.string(),
    points: z.number()
})

export default UserBody;
