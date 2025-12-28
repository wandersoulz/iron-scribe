import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ error: 'Missing token' });

    // Dev Bypass
    if (token === 'dev-token-root-user') {
        (req as any).user = { id: '00000000-0000-0000-0000-000000000000', email: 'void@iron-scribe.local' };
        return next();
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Attach the user to the request so routes can use it
    (req as any).user = user;
    next();
};