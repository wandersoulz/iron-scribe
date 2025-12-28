import { Router, Request, Response } from 'express';
import { pool } from '../db';
import { HeroClass } from '@iron-scribe/common';
import { requireAuth } from '../middleware/auth';

const router = Router();

// GET /classes/:name
router.get('/:name', requireAuth, async (req: Request, res: Response) => {
    const { name } = req.params;

    const query = `
        SELECT id, name, stats
        FROM classes
        WHERE name = $1
    `;

    try {
        const result = await pool.query(query, [name]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });

        const row = result.rows[0];
        
        // Assuming 'stats' column is a JSONB object matching ClassStats interface
        const classInfo: HeroClass = {
            id: row.id,
            name: row.name,
            staminaBase: row.stats.staminaBase,
            staminaPerLevel: row.stats.staminaPerLevel,
            recoveries: row.stats.recoveries
        };

        res.json(classInfo);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

export default router;