import { Router, Request, Response } from 'express';
import { pool } from '../db';
import { Hero, HeroState } from '@iron-scribe/common';
import { requireAuth } from '../middleware/auth';

interface HeroSummary {
    id: string;
    name: string;
    level: number;
    class: string;
}

const router = Router();

// GET /heroes/player
// Returns a summary list of heroes for a player
router.get('/player', requireAuth, async (req: Request, res: Response) => {
    const { userId } = (req as any).user.id;

    const query = `
        SELECT h.id, h.name, h.level, c.name as class
        FROM heroes h
        LEFT JOIN classes c ON h.class_id = c.id
        WHERE h.user_id = $1
    `;

    try {
        const result = await pool.query(query, [userId]);
        // Map to HeroSummary if needed, but the columns match the interface
        const heroes: HeroSummary[] = result.rows.map(row => ({
            id: row.id,
            name: row.name,
            level: row.level,
            class: row.class || 'Unknown' // Handle null class
        }));
        res.json(heroes);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({ error: message });
    }
});

// GET /heroes/:id/full
// Returns the full hero details, including state and (empty) features
router.get('/:id/full', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = (req as any).user.id;

    const query = `
        SELECT h.id, h.name, h.level, c.name as class, h.state
        FROM heroes h
        LEFT JOIN classes c ON h.class_id = c.id
        WHERE h.id = $1 and h.user_id = $2
    `;

    try {
        const result = await pool.query(query, [id, userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Hero not found" });
        }

        const row = result.rows[0];
        
        const hero: Hero = {
            id: row.id,
            name: row.name,
            level: row.level,
            class: row.class || 'Unknown',
            state: row.state || { staminaDamage: 0, recoveriesUsed: 0, victories: 0 },
            features: [] // Features not yet implemented in SQL schema
        };

        res.json(hero);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({ error: message });
    }
});

// POST /heroes/:id/state
// Updates the hero's state (stamina, recoveries, etc.)
router.post('/:id/state', requireAuth, async (
    req: Request<{ id: string }, {}, HeroState>,
    res: Response
) => {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const newState = req.body;

    const query = `
        UPDATE heroes 
        SET state = $1 
        WHERE id = $2 and user_id = $3;
    `;

    try {
        await pool.query(query, [JSON.stringify(newState), id, userId]);
        res.json({ success: true });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({ error: message });
    }
});

export default router;
